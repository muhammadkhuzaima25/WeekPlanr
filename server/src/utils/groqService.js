const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

let groqClient = null

async function getClient() {
  if (groqClient) return groqClient
  const key = process.env.GROQ_API_KEY
  if (!key || key === 'your_groq_api_key_here') return null
  try {
    const { default: Groq } = await import('groq-sdk')
    groqClient = new Groq({ apiKey: key })
    return groqClient
  } catch {
    return null
  }
}

export async function aiOptimize(tasks) {
  const groq = await getClient()
  if (!groq) return fallbackSort(tasks)

  const taskList = tasks.map(t => ({
    id: t._id.toString(),
    name: t.name,
    type: t.type,
    priority: t.priority,
    dueDate: t.dueDate?.toISOString?.()?.split('T')[0] || t.dueDate,
    estimatedHours: { Quiz: 1.5, Assignment: 2.5, Project: 4.0, Lab: 1.5, Exam: 3.5 }[t.type] || 2,
  }))

  const prompt = `You are a smart academic scheduler. Distribute these tasks across the week (Mon-Sun) optimally.

Rules:
- High priority tasks go on earlier days
- Tasks with closer due dates go first
- Don't put more than 3-4 tasks per day
- Spread similar subject tasks across different days
- Return ONLY valid JSON (no markdown, no backticks)

Tasks: ${JSON.stringify(taskList)}

Return format:
{ "schedule": { "Mon": ["taskId1", "taskId2"], "Tue": ["taskId3"], ... } }`

  try {
    const completion = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL || 'mixtral-8x7b-32768',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.1,
      response_format: { type: 'json_object' },
    })

    const text = completion.choices?.[0]?.message?.content
    if (!text) return fallbackSort(tasks)
    return JSON.parse(text).schedule || fallbackSort(tasks)
  } catch {
    return fallbackSort(tasks)
  }
}

export async function aiOverwhelm(todayTasks) {
  const groq = await getClient()
  if (!groq) return fallbackOverwhelm(todayTasks)

  const taskList = todayTasks.map(t => ({
    id: t._id.toString(),
    name: t.name,
    type: t.type,
    priority: t.priority,
    dueDate: t.dueDate?.toISOString?.()?.split('T')[0] || t.dueDate,
  }))

  const prompt = `User is overwhelmed. Pick ONLY the 3 most urgent tasks from today's list.

Consider: dueDate (closer = more urgent), priority (High > Medium > Low), type (Exam > Quiz > Assignment > Project > Lab)

Tasks: ${JSON.stringify(taskList)}

Return ONLY valid JSON:
{ "keep": ["taskId1", "taskId2", "taskId3"], "shift": ["taskId4", "taskId5"] }`

  try {
    const completion = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL || 'mixtral-8x7b-32768',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.1,
      response_format: { type: 'json_object' },
    })

    const text = completion.choices?.[0]?.message?.content
    if (!text) return fallbackOverwhelm(todayTasks)
    return JSON.parse(text)
  } catch {
    return fallbackOverwhelm(todayTasks)
  }
}

function fallbackSort(tasks) {
  const priorityWeight = { high: 3, medium: 2, low: 1 }
  const sorted = [...tasks].sort((a, b) => {
    const pa = priorityWeight[a.priority] || 0
    const pb = priorityWeight[b.priority] || 0
    if (pa !== pb) return pb - pa
    return new Date(a.dueDate) - new Date(b.dueDate)
  })
  const schedule = {}
  for (const day of DAYS) schedule[day] = []
  sorted.forEach((t, i) => {
    schedule[DAYS[i % 7]].push(t._id.toString())
  })
  return schedule
}

function fallbackOverwhelm(todayTasks) {
  const priorityWeight = { high: 3, medium: 2, low: 1 }
  const sorted = [...todayTasks].sort((a, b) => {
    const pa = priorityWeight[a.priority] || 0
    const pb = priorityWeight[b.priority] || 0
    if (pa !== pb) return pb - pa
    return new Date(a.dueDate) - new Date(b.dueDate)
  })
  return {
    keep: sorted.slice(0, 3).map(t => t._id.toString()),
    shift: sorted.slice(3).map(t => t._id.toString()),
  }
}
