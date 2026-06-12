import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import dns from 'dns'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import connectDB from './config/db.js'

// Fix Node.js DNS on Windows — system DNS at 127.0.0.1 often refuses SRV lookups
dns.setServers(['8.8.8.8', '1.1.1.1'])
import { loginLimiter, registerLimiter, apiLimiter } from './middleware/rateLimiter.js'
import { autoArchiveOverdueTasks } from './utils/autoArchive.js'
import authRoutes from './routes/auth.js'
import subjectRoutes from './routes/subjects.js'
import taskRoutes from './routes/tasks.js'
import scheduleRoutes from './routes/schedule.js'
import progressRoutes from './routes/progress.js'
import archiveRoutes from './routes/archive.js'

// __dirname fix for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load .env from server root
dotenv.config({ path: join(__dirname, '../.env') })

// Crash handlers
process.on('uncaughtException', (err) => console.error('Uncaught:', err.message))
process.on('unhandledRejection', (err) => console.error('Unhandled:', err?.message))

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.VERCEL === '1' ? true : 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())

// Root route for Vercel deployment health check & status
app.get('/', (req, res) => {
  const mongoState = {
    0: 'disconnected ❌',
    1: 'connected ✅',
    2: 'connecting...',
    3: 'disconnecting...',
  }
  res.status(200).json({
    status: "online",
    message: "WeekPlanr Backend API is running smoothly!",
    port: PORT,
    mongo: mongoState[mongoose.connection.readyState] || 'unknown',
    db: mongoose.connection.name || 'N/A',
    timestamp: new Date().toISOString()
  })
})

// Rate limiting
app.use('/api', apiLimiter)
app.use('/api/auth/login',    loginLimiter)
app.use('/api/auth/register', registerLimiter)
app.use('/api/auth/google',   apiLimiter)

// Routes
app.use('/api/auth',      authRoutes)
app.use('/api/subjects', subjectRoutes)
app.use('/api/tasks',    taskRoutes)
app.use('/api/schedule', scheduleRoutes)
app.use('/api/progress', progressRoutes)
app.use('/api',          archiveRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message)
  res.status(500).json({ message: 'Internal server error' })
})

// Start server
const startServer = async () => {
  try {
    await connectDB()
    // Auto-archive overdue tasks every hour
    await autoArchiveOverdueTasks() // run once on startup
    setInterval(autoArchiveOverdueTasks, 60 * 60 * 1000) // then every hour
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`)
      console.log(`✅ Health Check: http://localhost:${PORT}/`)
      console.log(`📦 ENV: PORT=${PORT} | MONGO=${process.env.MONGO_URI ? 'OK' : 'MISSING'}`)
    })
  } catch (err) {
    console.error('❌ Server failed to start:', err.message)
    process.exit(1)
  }
}

startServer()

export default app
