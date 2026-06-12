import mongoose from 'mongoose'

let cached = global.mongoose
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

const connectDB = async () => {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI).then((m) => m)
      .catch((err) => {
        console.error('MongoDB Error:', err.message)
        return null
      })
  }

  cached.conn = await cached.promise
  if (cached.conn) console.log('MongoDB Connected ✅')
  return cached.conn
}

export default connectDB
