// Site content for Dr. Madhu Saini, taken from https://drmadhusaini.doctorrating.in/
// Edit details here; every section of the site reads from this file.
import {
  Activity, BedDouble, ClipboardCheck, Droplet, Footprints, Gauge, HandHeart, Pill,
  Salad, Scale, ScanEye, Stethoscope, Syringe, TestTube, Thermometer, Wind
} from 'lucide-react'

export const doctor = {
  name: 'Dr. Madhu Saini',
  shortName: 'Dr. Saini',
  title: 'Sr. Consultant Physician & Diabetologist',
  specialty: 'General Physician & Diabetologist',
  degrees: 'MBBS, MD (Medicine)',
  college: 'PGIMS Rohtak',
  experienceYears: 13,

  hospital: {
    name: 'Ever Healthy Hospital',
    area: 'Sector 16-17, Hisar',
    street: 'Plot No. 1, Nursing Home Area, Sector 16-17, Near Shyam Baba Mandir',
    city: 'Hisar, Haryana 125001',
    website: 'https://everhealthyhospital.in/',
    mapQuery: 'Ever Healthy Hospital, Nursing Home Area, Sector 16-17, Hisar, Haryana 125001'
  },

  phone: { display: '+91 92530 61331', tel: '+919253061331' },
  emergency: { display: '+91 90348 33371', tel: '+919034833371' },
  whatsapp: '919253061331',

  hours: [
    { label: 'Morning', days: 'Mon – Sat', time: '10:00 AM – 3:00 PM' },
    { label: 'Evening', days: 'Mon – Sat', time: '5:30 PM – 7:00 PM' }
  ],
  hoursShort: 'Mon – Sat · 10:00 AM – 3:00 PM & 5:30 PM – 7:00 PM',

  images: {
    logo: '/images/logo.png',           // cropped from logo-original.png
    logoMark: '/images/logo-mark.png',  // icon only (stethoscope + cross)
    // Compressed copy of /images/doctor-profile.png (1.8 MB → 143 KB).
    portrait: '/images/doctor-profile.jpg',
    opd: '/images/dr-madhu-saini-opd.jpg'
  },

  about: [
    'Dr. Madhu Saini is a Sr. Consultant Physician & Diabetologist at Ever Healthy Hospital, Sector 16-17, Hisar. She completed her MBBS and MD in Medicine at PGIMS Rohtak and has 13 years of experience in adult medicine and diabetes care.',
    'Before joining Ever Healthy Hospital she worked at Fortis Hospital, Mohali, Adhar Hospital, Hisar and Sapra Multispeciality Hospital, Hisar. Patients know her for a calm, unhurried consultation: she listens carefully, explains each finding in plain language and treats the underlying cause, not just the symptoms.'
  ],

  credentials: [
    { kind: 'degree', text: 'MBBS, MD (Medicine) – PGIMS Rohtak' },
    { kind: 'current', text: 'Sr. Consultant Physician & Diabetologist, Ever Healthy Hospital, Hisar' },
    { kind: 'past', text: 'Ex. Consultant Physician – Sapra Multispeciality Hospital, Hisar' },
    { kind: 'past', text: 'Ex. Consultant Physician – Adhar Hospital, Hisar' },
    { kind: 'past', text: 'Ex. Physician – Fortis Hospital, Mohali' }
  ],

  categories: ['General Medicine', 'Diabetes Care', 'Chronic & Preventive Care'],

  services: [
    { category: 'General Medicine', icon: Stethoscope, title: 'Adult Medical Consultation', text: 'A thorough check-up for everyday and complex adult health problems, ending with a clear diagnosis and treatment plan.' },
    { category: 'General Medicine', icon: Thermometer, title: 'Fever & Infectious Diseases', text: 'Diagnosis and treatment of fevers and infections such as viral fever, typhoid, dengue and urinary infections.' },
    { category: 'General Medicine', icon: Wind, title: 'Asthma, COPD & Chest Problems', text: 'Care for breathlessness, chronic cough, asthma and COPD, including inhaler guidance and long-term control.' },
    { category: 'General Medicine', icon: Salad, title: 'Stomach, Liver & Digestive Problems', text: 'Treatment for acidity, indigestion, loose motions, fatty liver and other digestive complaints.' },
    { category: 'General Medicine', icon: Droplet, title: 'Anaemia & Nutritional Deficiencies', text: 'Testing and treatment for low haemoglobin, vitamin B12 and vitamin D deficiency and the tiredness they cause.' },
    { category: 'General Medicine', icon: BedDouble, title: 'Acute Medical Care & Admission', text: 'Hospital admission for serious illness, with in-house ICU and HDU support at Ever Healthy Hospital.' },

    { category: 'Diabetes Care', icon: Activity, title: 'Type 2 Diabetes Management', text: 'A personal plan of medicines, diet and lifestyle changes to bring blood sugar and HbA1c under control.' },
    { category: 'Diabetes Care', icon: Syringe, title: 'Insulin Therapy & Type 1 Diabetes', text: 'Starting and adjusting insulin, injection technique and sugar monitoring for type 1 and type 2 diabetes.' },
    { category: 'Diabetes Care', icon: TestTube, title: 'Pre-diabetes & Diabetes Screening', text: 'Early testing for people at risk, so rising sugar levels are caught while they can still be reversed.' },
    { category: 'Diabetes Care', icon: ScanEye, title: 'Diabetes Complications Screening', text: 'Regular checks of the kidneys, eyes, nerves and heart to find diabetes complications early.' },
    { category: 'Diabetes Care', icon: Footprints, title: 'Diabetic Foot Care', text: 'Foot examination, wound-care advice and prevention of ulcers and infections in people with diabetes.' },

    { category: 'Chronic & Preventive Care', icon: Gauge, title: 'High Blood Pressure (Hypertension)', text: 'Accurate diagnosis and long-term control of blood pressure to protect the heart, brain and kidneys.' },
    { category: 'Chronic & Preventive Care', icon: Pill, title: 'Thyroid Disorders', text: 'Diagnosis and treatment of hypothyroidism, hyperthyroidism and thyroid swelling, with regular monitoring.' },
    { category: 'Chronic & Preventive Care', icon: Scale, title: 'Cholesterol, Obesity & Heart Risk', text: 'Managing cholesterol, weight and other risk factors to lower the chance of heart attack and stroke.' },
    { category: 'Chronic & Preventive Care', icon: ClipboardCheck, title: 'Preventive Health Check-ups', text: 'Routine check-ups that pick up diabetes, BP, thyroid and other problems before they cause harm.' },
    { category: 'Chronic & Preventive Care', icon: HandHeart, title: 'Elderly (Geriatric) Care', text: 'Gentle, coordinated care for older adults living with several conditions and medicines.' }
  ],

  // Shown in the footer.
  footerServices: [
    'Type 2 Diabetes Management', 'Insulin Therapy & Type 1 Diabetes', 'High Blood Pressure (Hypertension)', 'Thyroid Disorders',
    'Fever & Infectious Diseases', 'Asthma, COPD & Chest Problems', 'Preventive Health Check-ups', 'Elderly (Geriatric) Care'
  ],

  faqs: [
    { q: 'What are Dr. Madhu Saini\'s OPD timings?', a: 'Monday to Saturday, in two sessions: 10:00 AM – 3:00 PM and 5:30 PM – 7:00 PM, at Ever Healthy Hospital, Sector 16-17, Hisar.' },
    { q: 'How do I book an appointment?', a: 'Call or WhatsApp +91 92530 61331, or send an enquiry with the form on this page. The team will contact you to confirm a time.' },
    { q: 'Where is Ever Healthy Hospital?', a: 'Plot No. 1, Nursing Home Area, Sector 16-17, Near Shyam Baba Mandir, Hisar, Haryana 125001.' },
    { q: 'What should I bring to my first visit?', a: 'Your previous prescriptions, recent test reports and a list of the medicines you take. For diabetes or BP, bring your recent sugar or BP readings too.' },
    { q: 'Can I be admitted if I need hospital care?', a: 'Yes. Patients who need admission are treated at Ever Healthy Hospital, which has in-house ICU and HDU support.' },
    { q: 'What should I do in an emergency?', a: 'Call the 24×7 hospital emergency on +91 90348 33371 or go straight to the hospital. Please don\'t use the website form for emergencies.' }
  ]
}
