const generateTip = (stats) => {
  if (!stats) return 'Complete your tasks to get personalized AI insights.'

  const { completionRate, currentStreak, totalTasks, completedTasks } = stats

  if (completionRate >= 80) {
    return 'Excellent progress! You\'re maintaining great consistency. Consider tackling harder topics first.'
  }
  if (currentStreak >= 5) {
    return `You're on a ${currentStreak}-day streak! This is great momentum. Try to review past material.`
  }
  if (totalTasks > 5 && completedTasks < Math.floor(totalTasks / 2)) {
    return 'You have several incomplete tasks. Try using the Pomodoro technique for 25-minute focused sessions.'
  }
  return 'Building consistent study habits takes time. Start with one focused study block today.'
}

const suggestSchedule = (tasks, subjects) => {
  const priorityMap = { high: 3, medium: 2, low: 1 }
  const sorted = [...tasks].sort((a, b) => {
    const pDiff = (priorityMap[b.priority] || 1) - (priorityMap[a.priority] || 1)
    if (pDiff !== 0) return pDiff
    return new Date(a.dueDate) - new Date(b.dueDate)
  })
  return sorted
}

export { generateTip, suggestSchedule }
