import Task from '../models/Task.js'
import Subject from '../models/Subject.js'

export const getStats = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).populate('subject')
    const subjects = await Subject.find({ user: req.user.id })

    const totalTasks = tasks.length
    const completedTasks = tasks.filter(t => t.completed).length
    const thisWeek = tasks.filter(t => {
      const d = new Date(t.createdAt)
      const now = new Date()
      const weekStart = new Date(now.setDate(now.getDate() - now.getDay() + 1))
      return d >= weekStart
    })
    const tasksDoneThisWeek = thisWeek.filter(t => t.completed).length
    const totalTasksThisWeek = thisWeek.length
    const completionRate = totalTasksThisWeek > 0 ? Math.round((tasksDoneThisWeek / totalTasksThisWeek) * 100) : 0

    let streak = 0
    const today = new Date()
    for (let i = 0; i < 30; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const dayTasks = tasks.filter(t => {
        const td = new Date(t.updatedAt)
        return td.toDateString() === d.toDateString() && t.completed
      })
      if (dayTasks.length > 0) streak++
      else if (i > 0) break
    }

    const subjectBreakdown = subjects.map(s => {
      const subjectTasks = tasks.filter(t => t.subject?._id?.toString() === s._id.toString())
      const completed = subjectTasks.filter(t => t.completed).length
      return {
        name: s.name,
        total: subjectTasks.length,
        completed,
        percentage: subjectTasks.length > 0 ? Math.round((completed / subjectTasks.length) * 100) : 0,
        color: s.color,
      }
    })

    const weakest = [...subjectBreakdown].sort((a, b) => a.percentage - b.percentage)[0]

    const weeklyCompletion = []
    for (let w = 0; w < 4; w++) {
      const start = new Date()
      start.setDate(start.getDate() - start.getDay() + 1 - w * 7)
      const end = new Date(start)
      end.setDate(end.getDate() + 6)
      const weekTasks = tasks.filter(t => {
        const d = new Date(t.createdAt)
        return d >= start && d <= end
      })
      const weekCompleted = weekTasks.filter(t => t.completed).length
      weeklyCompletion.unshift({
        week: `W${w + 1}`,
        completion: weekTasks.length > 0 ? Math.round((weekCompleted / weekTasks.length) * 100) : 0,
      })
    }

    res.json({
      totalTasks,
      completedTasks,
      tasksDoneThisWeek,
      totalTasksThisWeek,
      completionRate,
      currentStreak: streak,
      subjectBreakdown,
      weakestSubject: weakest || null,
      weeklyCompletion,
      todayDone: tasks.filter(t => {
        const d = new Date(t.updatedAt)
        return d.toDateString() === new Date().toDateString() && t.completed
      }).length,
      todayTotal: tasks.filter(t => {
        const d = new Date(t.updatedAt)
        return d.toDateString() === new Date().toDateString()
      }).length,
      aiTip: completionRate < 50
        ? 'Your completion rate is low. Try breaking tasks into smaller chunks.'
        : completionRate < 80
          ? 'You complete most tasks mid-week. Schedule harder tasks on Tue-Wed.'
          : 'Great consistency! Keep up the momentum.',
      aiInsight: streak > 5
        ? `You've maintained a ${streak}-day streak. Excellent discipline!`
        : 'Building consistency takes time. Try completing at least one task every day.',
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
