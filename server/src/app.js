// Express app shared by the local server (src/index.js) and the Vercel function (api/index.js).
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import appointmentRoutes from './routes/appointments.js'

let connecting
// Opens one MongoDB connection and reuses it across requests and warm serverless invocations.
export function connectDB(uri = process.env.MONGODB_URI) {
  if (!uri) return Promise.reject(new Error('MONGODB_URI is not set'))
  connecting ??= mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 }).catch(err => { connecting = undefined; throw err })
  return connecting
}

const app = express()
app.set('trust proxy', 1) // behind Vercel's proxy: lets the rate limiter see the real client IP
app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(',') || 'http://localhost:5173' }))
app.use(express.json({ limit: '20kb' }))
app.get('/api/health', (_req, res) => res.json({ status: 'ok', db: mongoose.connection.readyState === 1 }))
app.use('/api', async (_req, res, next) => {
  try { await connectDB(); next() } catch (err) {
    console.error('MongoDB connection failed:', err.message)
    res.status(503).json({ message: 'Online enquiries are temporarily unavailable.' })
  }
})
app.use('/api/appointments', appointmentRoutes)
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ message: 'Server error. Please try again later.' })
})

export default app
