# AI Career Accelerator — Full-Stack Landing Page

A premium, fully responsive single-page course website built with React + Vite, Tailwind CSS, Framer Motion, Node.js + Express, Socket.io, and Redis.

## Project Structure

```
CertoMeter/
├── frontend/          # React + Vite app
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero/
│   │   │   ├── About/
│   │   │   ├── AITools/
│   │   │   ├── Productivity/
│   │   │   ├── WhyDifferent/
│   │   │   ├── Community/
│   │   │   ├── Testimonials/
│   │   │   ├── Pricing/
│   │   │   ├── FAQ/
│   │   │   ├── Contact/
│   │   │   ├── Footer/
│   │   │   └── ui/           # Reusable UI components
│   │   ├── context/          # SocketContext (real-time)
│   │   ├── hooks/            # useScrollAnimation
│   │   ├── utils/            # API helpers
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── ...
└── backend/           # Node.js + Express API
    ├── src/
    │   ├── config/    # MongoDB + Redis config
    │   ├── routes/    # analytics, leads, newsletter
    │   ├── controllers/
    │   ├── models/    # Lead, Visitor schemas
    │   ├── middleware/ # Rate limiter
    │   └── socket/    # Socket.io manager
    └── server.js
```

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (optional — falls back to in-memory)
- Redis (optional — falls back to in-memory)

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your values
npm run dev
```

Backend runs on `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your values
npm run dev
```

Frontend runs on `http://localhost:5173`

## Environment Variables

### Backend (`backend/.env`)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ai-career-accelerator
REDIS_HOST=localhost
REDIS_PORT=6379
FRONTEND_URL=http://localhost:5173
PUBLIC_SITE_URL=http://localhost:5173
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_google_app_password
EMAIL_FROM=CertoMeter <your@gmail.com>
EMAIL_TO=your@gmail.com
EMAIL_TEST_TOKEN=change_me_to_a_long_random_value
WHATSAPP_NUMBER=+919999999999
```

### Frontend (`frontend/.env`)
```
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
VITE_WHATSAPP_NUMBER=919999999999
VITE_WHATSAPP_MESSAGE=Hi! I'm interested in the AI Career Accelerator course.
```

## Features

### Frontend
- **11 sections**: Hero, About, AI Tools, Productivity, Why Different, Community, Testimonials, Pricing, FAQ, Contact, Footer
- **Framer Motion** scroll-triggered animations throughout
- **Magnetic buttons** with spring physics
- **Infinite marquee** for 100+ AI tools showcase
- **Animated counters** that trigger on scroll
- **Glassmorphism** cards with gradient borders
- **Custom cursor** glow effect (desktop)
- **Sticky CTA** bar that appears on scroll
- **Real-time** active user count via Socket.io
- **Countdown timer** on pricing section
- **Testimonials carousel** with auto-play
- **Animated FAQ** accordion
- **WhatsApp integration** for contact
- **Newsletter** subscription
- **Code splitting** with lazy loading
- **Mobile-first** responsive design

### Backend
- **Socket.io** WebSocket for real-time active users
- **Redis** for scalable active user tracking (in-memory fallback)
- **MongoDB** for lead storage (in-memory fallback)
- **REST APIs**: analytics tracking, lead capture, newsletter
- **Rate limiting** via express-rate-limit
- **Security**: helmet, CORS, input validation
- **Graceful fallbacks** — works without MongoDB/Redis

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/analytics/track` | Track page visitor |
| GET | `/api/analytics/stats` | Get active users & total visitors |
| POST | `/api/leads/submit` | Submit lead/contact form |
| GET | `/api/leads` | List all leads |
| POST | `/api/newsletter/subscribe` | Subscribe to newsletter |
| GET | `/api/newsletter/count` | Get subscriber count |
| GET | `/health` | Health check |

## WebSocket Events

| Event | Direction | Payload |
|-------|-----------|---------|
| `stats:update` | Server → Client | `{ activeUsers, totalVisitors, timestamp }` |
| `ping` | Client → Server | — |
| `pong` | Server → Client | `{ timestamp }` |

## Production Deployment

### Frontend (Vercel / Netlify)
```bash
cd frontend
npm run build
# Deploy dist/ folder
```

### Backend (Railway / Render / VPS)
```bash
cd backend
NODE_ENV=production node server.js
```

### Recommended Stack
- Frontend: Vercel (free tier works great)
- Backend: Railway or Render
- Database: MongoDB Atlas (free tier)
- Cache: Upstash Redis (free tier)

## Customization

1. **Colors**: Edit `frontend/tailwind.config.js` → `colors.accent`
2. **WhatsApp number**: Set `VITE_WHATSAPP_NUMBER` in frontend `.env`
3. **Course content**: Update tool lists, testimonials, FAQs in component files
4. **Pricing**: Edit `Pricing.jsx` — update the ₹5,999 price point
5. **Analytics**: Replace Visitor model with your preferred analytics service

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend framework | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion 11 + GSAP 3 |
| Real-time | Socket.io 4 |
| Backend | Node.js + Express 4 |
| Cache | Redis (ioredis) |
| Database | MongoDB (Mongoose) |
| Notifications | react-hot-toast |
| HTTP client | Axios |

---

Built for the AI Career Accelerator — a premium course helping 5,000+ learners master AI.
