// Local development server. On Vercel the same app runs as a serverless function (see /api/index.js).
import 'dotenv/config'
import app, { connectDB } from './app.js'

const port = process.env.PORT || 5050
try {
  await connectDB()
  app.listen(port, () => console.log(`API running on http://localhost:${port}`))
} catch (error) {
  console.error('MongoDB connection failed:', error.message)
  process.exit(1)
}
