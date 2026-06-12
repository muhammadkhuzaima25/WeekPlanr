import mongoose from 'mongoose'

const scheduleDaySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  day: { type: String, enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], required: true },
  date: { type: Date },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  totalHours: { type: Number, default: 0 },
  notes: { type: String },
}, { timestamps: true })

scheduleDaySchema.index({ user: 1, day: 1 }, { unique: true })

export default mongoose.model('ScheduleDay', scheduleDaySchema)
