import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import Appointment, { INTERESTS, SESSIONS } from '../models/Appointment.js'
const router = Router()
const submitLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 8, standardHeaders: true, legacyHeaders: false, message: { message: 'Too many enquiries from this device. Please try again later.' } })
const str = v => (typeof v === 'string' ? v.trim() : '')

router.post('/', submitLimiter, async (req, res, next) => {
  try {
    const name = str(req.body.name), phone = str(req.body.phone), email = str(req.body.email)
    const interest = str(req.body.interest), preferredDate = str(req.body.preferredDate)
    const preferredTime = str(req.body.preferredTime), message = str(req.body.message)
    if (name.length < 2 || !phone || req.body.consent !== true) return res.status(400).json({ message: 'Name, phone number and contact consent are required.' })
    if (!/^[0-9+()\s-]{8,18}$/.test(phone)) return res.status(400).json({ message: 'Please enter a valid phone number.' })
    if (interest && !INTERESTS.includes(interest)) return res.status(400).json({ message: 'Please choose a service from the list.' })
    if (preferredTime && !SESSIONS.includes(preferredTime)) return res.status(400).json({ message: 'Please choose the morning or evening session.' })
    if (preferredDate && !/^\d{4}-\d{2}-\d{2}$/.test(preferredDate)) return res.status(400).json({ message: 'Please enter a valid date.' })
    const appointment = await Appointment.create({ name, phone, email, interest, preferredDate, preferredTime, message })
    res.status(201).json({ message: 'Enquiry received', id: appointment._id })
  } catch (error) {
    if (error.name === 'ValidationError') return res.status(400).json({ message: 'Please check the form details and try again.' })
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const expected = process.env.ADMIN_API_TOKEN
    const token = req.headers.authorization?.replace(/^Bearer\s+/i, '')
    if (!expected || !token || token !== expected) return res.status(401).json({ message: 'Unauthorized' })
    const items = await Appointment.find().sort({ createdAt: -1 }).limit(200).lean()
    res.json(items)
  } catch (error) { next(error) }
})
export default router
