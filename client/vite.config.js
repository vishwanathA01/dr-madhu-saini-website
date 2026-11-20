import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// In development, /api calls are forwarded to the local Express server, matching production
// where Vercel serves the API from the same domain.
const proxy = { '/api': 'http://localhost:5050' }
export default defineConfig({ plugins: [react()], server: { port: 5173, proxy }, preview: { proxy } })
