import { autoArchiveOverdueTasks } from '../utils/autoArchive.js'

export const triggerArchive = async (req, res) => {
  try {
    const result = await autoArchiveOverdueTasks()
    res.json(result)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
