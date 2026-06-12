import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  name: { type: String, required: true },
  type: { type: String, enum: ['Assignment', 'Quiz', 'Project', 'Lab', 'Exam'], default: 'Assignment' },
  dueDate: { type: Date, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  completed: { type: Boolean, default: false },
  autoArchived: { type: Boolean, default: false },
  scheduledDay: { type: String }, // Mon, Tue, etc.
  orderIndex: { type: Number, default: 0 },
  notes: { type: String },
}, { timestamps: true })

export default mongoose.model('Task', taskSchema)
