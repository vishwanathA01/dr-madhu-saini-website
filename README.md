# Dr. Madhu Saini — MERN Doctor Website

Website for Dr. Madhu Saini, General Physician & Diabetologist at Ever Healthy Hospital, Sector 16-17, Hisar. Built with React, Vite, Express, MongoDB and Mongoose.

## Content source & branding
Content and OPD details follow https://drmadhusaini.doctorrating.in/. All details live in `client/src/data/doctor.js`: qualifications, experience, the 16 services, phone numbers, address, OPD timings, FAQs and image paths. Edit that file to change anything on the site.

The visual identity comes from the Dr. Madhu Saini logo:
- **Colours** (defined at the top of `client/src/styles.css`): navy `#01427e` / `#0b2a55`, brand blue `#0b6fbf`, teal `#0e8fb5`, ink `#0a1628`.
- **Fonts**: Merriweather for headings (close to the logo's serif wordmark), Poppins for body text.
- **Motif**: the logo's ECG heartbeat line appears in the section labels and across the hero.

Images in `client/public/`:
- `images/logo-original.png`: the logo as supplied.
- `images/logo.png`: trimmed logo for the header and footer.
- `images/logo-mark.png`, `favicon.png`, `apple-touch-icon.png`, `images/icon-512.png`: icon-only versions (stethoscope + cross).
- `images/doctor-profile.png`: hero portrait (original). `doctor-profile.jpg` is the compressed copy the site uses. Regenerate it if you replace the PNG.
- `images/dr-madhu-saini-opd.jpg`: OPD photo, used in the About section.
- `images/dr-madhu-saini.jpg`: cut-out portrait, not used yet.

## Sections
Top info bar → sticky header → hero (badges, 13+ years counter, OPD card) → highlights strip → About (bio + credentials) → Services (16 cards with filter tabs: General Medicine, Diabetes Care, Chronic & Preventive Care) → FAQs → Contact (appointment / emergency / location / hours cards, enquiry form, Google Map) → footer. WhatsApp and Call buttons float in the corner.

## Appointment enquiries
- The form saves to MongoDB via `POST /api/appointments`, with fields name, phone, email, interest, preferred date, session, message and consent.
- After sending, the patient also gets a button to send the same enquiry on WhatsApp (+91 92530 61331). If the API can't be reached, WhatsApp is offered instead, so no enquiry is lost.
- Sundays are rejected because the OPD is closed.
- Staff view enquiries at `/admin` with the `ADMIN_API_TOKEN`.

## Requirements
- Node.js 20+
- MongoDB (local or Atlas)

## Project layout
- `client/`: React + Vite website (`/` and the `/admin` dashboard)
- `server/src/app.js`: Express API (shared by local dev and Vercel)
- `server/src/index.js`: local API server
- `api/index.js`: Vercel serverless entry that serves the same Express app at `/api/*`
- `vercel.json`: Vercel build, output and rewrite settings

## Run locally
The API runs on port **5050**. On macOS, port 5000 is taken by AirPlay Receiver. The Vite dev server forwards `/api` to it, so the client needs no `.env`.

```bash
npm run install:all                     # installs client + server dependencies
cp server/.env.example server/.env      # set MONGODB_URI and a long random ADMIN_API_TOKEN
npm run dev:server                      # terminal 1 → http://localhost:5050
npm run dev:client                      # terminal 2 → http://localhost:5173
```

## API
- `GET /api/health`: health check (`db` shows whether MongoDB is connected)
- `POST /api/appointments`: submit an enquiry. Phone must be 8–18 characters of digits, spaces, `+`, `-` or `()`. Interest must be one of the form options.
- `GET /api/appointments`: list enquiries. Requires `Authorization: Bearer <ADMIN_API_TOKEN>`.
- If MongoDB is unreachable, the API returns 503 and the form offers WhatsApp instead.

## Deploy (Vercel + MongoDB Atlas)
One Vercel project serves the website and the API on the same domain.

1. **Database**: create a free MongoDB Atlas cluster, a database user, and allow network access from `0.0.0.0/0` (Vercel has no fixed IPs). Copy the connection string and add the database name, e.g. `.../dr_madhu_saini?retryWrites=true&w=majority`.
2. **Vercel**: import this GitHub repo (keep the root directory as the repo root; `vercel.json` handles the build). Under Settings → Environment Variables, add:
   - `MONGODB_URI`: the Atlas connection string
   - `ADMIN_API_TOKEN`: a long random secret, used to log in at `/admin`
3. Redeploy. Pushes to `main` then deploy automatically.

## Before going live
1. Have the doctor/hospital confirm all details and approve use of the photos and logo.
2. Once the domain is known, add absolute `og:image` and `url`/`image` fields to the JSON-LD in `client/index.html`.
3. Replace the bearer-token admin with a proper login (hashed passwords, sessions/JWT, lockout) before relying on it.
4. Add a privacy notice and data-retention policy for enquiry data.
