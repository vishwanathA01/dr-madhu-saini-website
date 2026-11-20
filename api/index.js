// Vercel serverless entry point. vercel.json rewrites every /api/* request here,
// and the Express app routes it (/api/health, /api/appointments).
import app from '../server/src/app.js'

export default app
