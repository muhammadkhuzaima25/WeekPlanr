import mongoose from 'mongoose'

const subjectSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  creditHours: { type: Number, default: 3 },
  color: { type: String, default: '#7C3AED' },
  understandingLevel: { type: Number, min: 1, max: 5, default: 3 },
}, { timestamps: true })

export default mongoose.model('Subject', subjectSchema)
