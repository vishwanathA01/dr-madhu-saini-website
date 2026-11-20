import mongoose from 'mongoose'
// Keep in sync with the "Interested in" options on the website form.
export const INTERESTS = ['General Medicine', 'Diabetes Care', 'Chronic & Preventive Care', 'General consultation']
export const SESSIONS = ['Morning', 'Evening']
const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  phone: { type: String, required: true, trim: true, maxlength: 18 },
  email: { type: String, trim: true, lowercase: true, maxlength: 160 },
  interest: { type: String, trim: true, maxlength: 60 },
  preferredDate: { type: String, maxlength: 10 },
  preferredTime: { type: String, maxlength: 30 },
  message: { type: String, trim: true, maxlength: 500 },
  status: { type: String, enum: ['new', 'contacted', 'confirmed', 'closed'], default: 'new' }
}, { timestamps: true })
export default mongoose.model('Appointment', appointmentSchema)
