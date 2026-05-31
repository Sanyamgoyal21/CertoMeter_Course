# AI Career Accelerator — Full-Stack Landing Page

A premium, fully responsive single-page course website built with React + Vite, Tailwind CSS, Framer Motion, Node.js + Express, Socket.io, and MongoDB. Includes a Gemini AI-powered mascot chatbot, Razorpay payment integration, real-time active user tracking, and a complete 100+ AI tools showcase.

---

## Project Structure

```
CertoMeter/
├── frontend/                        # React + Vite app
│   ├── public/                      # Static assets (logos, photos)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero/                # Hero section with dashboard mockup
│   │   │   ├── About/               # 5-phase curriculum
│   │   │   ├── AITools/             # 100+ tools marquee + featured grid
│   │   │   ├── Productivity/
│   │   │   ├── WhyDifferent/        # Numbered steps + comparison table
│   │   │   ├── Community/
│   │   │   ├── Testimonials/        # Auto-play carousel with real photos
│   │   │   ├── Pricing/             # Countdown timer + Razorpay
│   │   │   ├── FAQ/                 # Animated accordion
│   │   │   ├── Contact/             # WhatsApp + lead form
│   │   │   ├── Footer/
│   │   │   ├── MascotChat/          # Gemini AI-powered chatbot
│   │   │   ├── SplashScreen/        # Animated intro screen
│   │   │   └── ui/                  # CursorEffect, MagneticButton, GlowOrb,
│   │   │                            #   AnimatedCounter, StickyCTA
│   │   ├── context/
│   │   │   ├── SocketContext.jsx    # Real-time active users
│   │   │   └── ThemeContext.jsx     # Light / dark mode
│   │   ├── hooks/
│   │   │   ├── useScrollAnimation.js
│   │   │   └── useRazorpay.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── pages/                   # Policy & standalone pages
│   │   │   ├── PrivacyPolicy.jsx
│   │   │   ├── TermsConditions.jsx
│   │   │   ├── RefundPolicy.jsx
│   │   │   ├── ShippingPolicy.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   └── FAQPage.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── vite.config.js
└── backend/                         # Node.js + Express API
    ├── src/
    │   ├── config/                  # MongoDB + Redis config
    │   ├── routes/                  # analytics, leads, newsletter, payment
    │   ├── controllers/
    │   ├── models/                  # Lead, Visitor schemas
    │   ├── middleware/              # Rate limiter
    │   └── socket/                  # Socket.io manager
    └── server.js
```

---

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (optional — falls back to in-memory)
- Redis (optional — falls back to in-memory)

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # fill in your values
npm run dev            # runs on http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env   # fill in your values
npm run dev            # runs on http://localhost:5173
```

---

## Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ai-career-accelerator
REDIS_HOST=localhost
REDIS_PORT=6379
FRONTEND_URL=http://localhost:5173
PUBLIC_SITE_URL=http://localhost:5173
BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_NAME=AI Career Accelerator
BREVO_SENDER_EMAIL=your_verified_sender@gmail.com
EMAIL_TO=your@gmail.com
EMAIL_TEST_TOKEN=change_me_to_a_long_random_value
WHATSAPP_NUMBER=+919999999999
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
GEMINI_API_KEY=your_google_gemini_api_key
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
VITE_WHATSAPP_NUMBER=919999999999
VITE_WHATSAPP_MESSAGE=Hi! I'm interested in the AI Career Accelerator course.
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

---

## Features

### Frontend
- **11 sections** — Hero, About, AI Tools, Productivity, Why Different, Community, Testimonials, Pricing, FAQ, Contact, Footer
- **7 policy / standalone pages** — Privacy, Terms, Refund, Shipping, Contact, About, FAQ
- **Gemini AI mascot** — floating chatbot powered by Google Gemini answers course questions
- **Razorpay checkout** — one-click payment with order creation & verification
- **100+ AI tool logos** — local brand images + Simple Icons, infinite marquee
- **Real testimonial photos** — actual person photos from `public/`
- **Numbered steps UI** — horizontally scrollable feature steps in Why Different
- **Framer Motion** — scroll-triggered animations throughout
- **Magnetic buttons** with spring physics
- **Animated counters** that trigger on scroll
- **Glassmorphism** cards with gradient borders
- **Light / dark theme** toggle with full CSS overrides
- **Custom cursor** glow effect (desktop)
- **Sticky CTA** bar on scroll
- **Real-time active users** via Socket.io
- **Countdown timer** on pricing section
- **Testimonials carousel** with auto-play
- **Animated FAQ accordion**
- **WhatsApp integration** for contact
- **Newsletter subscription**
- **Splash screen** with Lottie animation
- **Mobile-first** responsive design

### Backend
- **Socket.io** — real-time active user broadcast
- **Redis** — scalable active user tracking (in-memory fallback)
- **MongoDB** — lead & visitor storage (in-memory fallback)
- **Razorpay** — order creation & payment verification endpoints
- **Gemini AI** — `/api/chat` proxy endpoint for mascot chatbot
- **Brevo** — transactional email for lead notifications
- **REST APIs** — analytics, leads, newsletter, payment
- **Rate limiting** via express-rate-limit
- **Security** — helmet, CORS, input validation with validator.js
- **Graceful fallbacks** — fully functional without MongoDB or Redis

---

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/analytics/track` | Track page visitor |
| GET | `/api/analytics/stats` | Get active users & total visitors |
| POST | `/api/leads/submit` | Submit lead / contact form |
| GET | `/api/leads` | List all leads |
| POST | `/api/newsletter/subscribe` | Subscribe to newsletter |
| GET | `/api/newsletter/count` | Get subscriber count |
| POST | `/api/payment/create-order` | Create Razorpay order |
| POST | `/api/payment/verify` | Verify Razorpay payment signature |
| POST | `/api/chat` | Gemini AI chat proxy |
| GET | `/health` | Health check |

---

## WebSocket Events

| Event | Direction | Payload |
|-------|-----------|---------|
| `stats:update` | Server → Client | `{ activeUsers, totalVisitors, timestamp }` |
| `ping` | Client → Server | — |
| `pong` | Server → Client | `{ timestamp }` |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend framework | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion 11 + GSAP 3 |
| Icons | Lucide React + Simple Icons |
| Real-time | Socket.io 4 |
| Backend | Node.js + Express 4 |
| AI chatbot | Google Gemini API (`@google/genai`) |
| Payments | Razorpay |
| Cache | Redis (ioredis) |
| Database | MongoDB (Mongoose) |
| Email | Brevo (Sendinblue) |
| Lottie | @lottiefiles/dotlottie-react |
| HTTP client | Axios |
| Notifications | react-hot-toast |

---

## Production Deployment

### Frontend — Vercel / Netlify
```bash
cd frontend
npm run build
# Deploy the dist/ folder
```

### Backend — Railway / Render / VPS
```bash
cd backend
NODE_ENV=production node server.js
```

### Recommended Services (free tiers available)
| Service | Provider |
|---------|----------|
| Frontend hosting | Vercel |
| Backend hosting | Railway or Render |
| Database | MongoDB Atlas |
| Cache | Upstash Redis |
| Payments | Razorpay |
| AI | Google AI Studio (Gemini) |

---

## Customization

| What | Where |
|------|-------|
| Brand colors | `frontend/tailwind.config.js` → `colors.accent` |
| Course price | `frontend/src/components/Pricing/Pricing.jsx` |
| WhatsApp number | `VITE_WHATSAPP_NUMBER` in `frontend/.env` |
| Tool list | `frontend/src/components/AITools/AITools.jsx` |
| Testimonials | `frontend/src/components/Testimonials/Testimonials.jsx` |
| Phase curriculum | `frontend/src/components/About/About.jsx` |
| Mascot personality | `backend/src/routes/chat.js` system prompt |
| Tool logos | Drop PNG/SVG into `frontend/public/` and map in `AITools.jsx` |

---

Built for the AI Career Accelerator — a premium course helping 5,000+ learners master AI tools and build AI-powered careers.
