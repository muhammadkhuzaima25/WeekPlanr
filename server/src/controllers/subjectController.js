import Subject from '../models/Subject.js'

export const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({ user: req.user.id })
    res.json(subjects)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const createSubject = async (req, res) => {
  try {
    const { subjects } = req.body
    if (Array.isArray(subjects)) {
      const created = await Subject.insertMany(
        subjects.map(s => ({ ...s, user: req.user.id }))
      )
      return res.status(201).json(created)
    }
    const subject = await Subject.create({ ...req.body, user: req.user.id })
    res.status(201).json(subject)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    )
    res.json(subject)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const deleteSubject = async (req, res) => {
  try {
    await Subject.findOneAndDelete({ _id: req.params.id, user: req.user.id })
    res.json({ message: 'Subject deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
