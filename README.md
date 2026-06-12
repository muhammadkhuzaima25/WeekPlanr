<p align="center">
  <img alt="WeekPlanr — AI Weekly Study Planner" src="./client/public/WeekPlanr.png" width="120" style="border-radius: 20px;">
</p>

<h1 align="center">Week<span style="color:#00C98A">Planr</span></h1>

<p align="center">
  <strong>Your AI Weekly Study Planner for Stressful Semesters</strong>
</p>

<p align="center">
  <a href="https://weekplanr.vercel.app">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-weekplanr.vercel.app-00C98A?style=for-the-badge&labelColor=0f172a" alt="Live Demo">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-00C98A?style=flat&logo=react&labelColor=0f172a">
  <img src="https://img.shields.io/badge/Node.js-20-339933?style=flat&logo=nodedotjs&labelColor=0f172a">
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb&labelColor=0f172a">
  <img src="https://img.shields.io/badge/Express.js-4-000000?style=flat&logo=express&labelColor=0f172a">
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite&labelColor=0f172a">
  <img src="https://img.shields.io/badge/AI-Powered-00C98A?style=flat&labelColor=0f172a">
</p>

<br>

---

<!-- SEO TAGS -->
<!--
weekplanr, ai study planner, weekly study planner, semester planner, 
student productivity app, ai schedule generator, university student planner,
mern stack project, full stack web app, react study planner,
deadline tracker for students, assignment tracker, quiz planner,
student stress management app, ai powered timetable generator,
pakistan university student app, gcu lahore, fast numl nust students,
study schedule app, academic planner 2025, smart semester organizer,
overwhelm mode study app, drag and drop study planner, deadline radar,
browser notification study app, jwt authentication mern, 
full stack mern portfolio project, react nodejs mongodb express,
ai weekly planner open source, free study planner for students,
semester stress relief app, intelligent academic scheduler
-->

---

## 📌 Overview

**WeekPlanr** is a production-grade full-stack MERN web application built for university students who struggle to manage assignments, quizzes, projects, and exams every semester.

Unlike generic to-do apps, WeekPlanr uses **AI** to intelligently build your weekly study schedule — prioritizing tasks by deadline proximity, subject importance, and task type. With drag-and-drop planning, a deadline radar, auto-archive, and browser push notifications, you'll never miss a submission again.

> Built specifically for the **semester system** — where multiple deadlines collide every week.

---

## ❗ Problem Statement

Every semester, university students face the same four problems:

- **Overwhelming workload** — multiple subjects, assignments, quizzes, and exams with no clear plan
- **Missed deadlines** — no system to track what's due and when
- **Poor prioritization** — hard to tell which task needs attention *right now*
- **No structure** — studying without a day-by-day plan leads to cramming and burnout

WeekPlanr solves all four with AI-generated weekly schedules, deadline radar visualization, smart browser notifications, and drag-and-drop planning.

---

## 🖥️ UI Preview

<p align="center">
  <img src="client/public/weekplanr_Dashboard.png" alt="AptifyAI Dashboard" width="85%" style="border-radius:16px; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
</p>

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🧠 **AI Weekly Schedule** | AI creates a smart day-by-day plan — prioritized by urgency, task type, and weak areas |
| 📋 **Drag & Drop Planning** | Rearrange tasks freely with `@hello-pangea/dnd` — changes sync instantly |
| 🚨 **Deadline Radar** | Three-zone urgency view: Critical (≤24h), Warning (2–3 days), Safe (4+ days) |
| 🔔 **Smart Notifications** | Browser push notifications at 24h, 6h, and deadline time for every task |
| 🤯 **Overwhelm Mode** | AI keeps your 3 most urgent tasks today, shifts the rest to tomorrow automatically |
| 📊 **Progress Dashboard** | Visual breakdown of completed vs pending tasks per subject |
| 🗑️ **Auto-Archive** | Overdue tasks auto-mark as completed — keeps your weekly view clean |
| 🌙 **Dark & Light Mode** | Full theme support persisted across sessions |
| 🔐 **JWT + Google OAuth** | Secure email/password login or one-click Google sign-in |
| 🛡️ **Rate Limiting** | Smart rate limiting on all endpoints to prevent abuse and spam |
| 💨 **Smooth Animations** | Page transitions and micro-interactions via Framer Motion |

---

## 🛠️ Tech Stack

**Frontend**
- React 19 + Vite 8
- React Router v7
- Axios
- Tailwind CSS 4
- Framer Motion 12
- Lucide React (icons)
- `@hello-pangea/dnd` (drag & drop)
- `@react-oauth/google` (Google OAuth)
- `react-hot-toast` (notifications)

**Backend**
- Node.js + Express 4
- MongoDB Atlas + Mongoose 8
- JWT Authentication + bcryptjs
- AI API Integration
- express-rate-limit
- Helmet (security headers)
- Google Auth Library

---

## 🔒 Rate Limiting

All endpoints are protected against spam and abuse:

| Scope | Limit | Window |
|---|---|---|
| All `/api` routes | 100 requests | 15 min |
| `/api/auth/login` | 5 attempts | 15 min |
| `/api/auth/register` | 3 accounts | 1 hour |

---

## ⚙️ How to Run Locally

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier works)
- AI API key
- Google OAuth Client ID (from [console.cloud.google.com](https://console.cloud.google.com))

### 1. Clone the repo
```bash
git clone https://github.com/muhammadkhuzaima25/WeekPlanr.git
cd WeekPlanr
```

### 2. Backend setup
```bash
cd server
npm install
```

Create `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.xxxxx.mongodb.net/weekplanr
JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
AI_API_KEY=your_ai_api_key
GOOGLE_CLIENT_ID=your_google_client_id
```

Start backend:
```bash
npm run dev
```

### 3. Frontend setup
```bash
cd client
npm install
```

Create `client/.env`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

Start frontend:
```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 📁 Project Structure

```
WeekPlanr/
├── client/                        # React + Vite Frontend
│   ├── public/
│   │   └── WeekPlanr.svg          # Logo / Favicon
│   └── src/
│       ├── components/            # Navbar, Footer, Sidebar, TaskCard, WeekGrid, etc.
│       ├── context/               # AuthContext, ThemeContext
│       ├── pages/                 # Landing, WeeklyPlan, AddTask, DeadlineRadar, etc.
│       ├── services/              # Axios API client
│       ├── App.jsx                # Router setup
│       ├── main.jsx               # Entry point
│       └── index.css              # Tailwind + theme variables
│
└── server/                        # Node + Express Backend
    ├── src/
    │   ├── config/                # MongoDB connection
    │   ├── controllers/           # auth, task, subject, schedule, progress
    │   ├── middleware/            # authMiddleware, rateLimiter
    │   ├── models/                # User, Task, Subject, ScheduleDay
    │   ├── routes/                # auth, tasks, subjects, schedule, progress, archive
    │   ├── utils/                 # aiService, autoArchive
    │   └── server.js              # Express app entry
    ├── .env
    └── package.json
```

---

## 🌐 API Endpoints

### Auth — `/api/auth`
| Method | Path | Description |
|---|---|---|
| POST | /register | Create new account |
| POST | /login | Login, returns JWT |
| POST | /google | Google OAuth login/signup |
| GET | /me | Get current user (protected) |
| PUT | /update | Update profile (protected) |

### Tasks — `/api/tasks`
| Method | Path | Description |
|---|---|---|
| GET | / | Get all user tasks |
| POST | / | Create a new task |
| PUT | /:id | Update a task |
| DELETE | /:id | Delete a task |

### Subjects — `/api/subjects`
| Method | Path | Description |
|---|---|---|
| GET | / | Get all subjects |
| POST | / | Create a subject |
| PUT | /:id | Update a subject |
| DELETE | /:id | Delete a subject |

### Schedule — `/api/schedule`
| Method | Path | Description |
|---|---|---|
| POST | /generate | AI-generate weekly schedule |
| POST | /optimize | Optimize existing schedule with AI |
| POST | /overwhelm | Keep top 3 urgent tasks, shift rest to tomorrow |

### Progress — `/api/progress`
| Method | Path | Description |
|---|---|---|
| GET | / | Get progress stats per subject |

### Archive — `/api/archive`
| Method | Path | Description |
|---|---|---|
| GET | / | Get auto-archived overdue tasks |

---

## 🔮 Future Roadmap

- [ ] Email reminders — 24h before deadline
- [ ] Google Calendar sync
- [ ] Collaborative groups — share tasks with classmates
- [ ] Mobile app — React Native version
- [ ] Pomodoro / Study timer integration
- [ ] File attachments — upload assignment PDFs

---

## 🔍 SEO Keywords
`AI study planner` · `weekly study planner for students` · `semester planner app` · `student productivity app` · `AI schedule generator` · `university student planner` · `deadline tracker students` · `assignment and quiz tracker` · `drag and drop study planner` · `overwhelm mode study app` · `MERN stack portfolio project` · `React Node.js MongoDB Express` · `Pakistani university student app` · `smart semester organizer` · `academic planner 2026` · `free study planner` · `AI powered task prioritization` · `Vercel Render deployment`

---

## 👤 Author

**Muhammad Khuzaima**
Graphic Designer · Logo & Brand Identity Expert · UI/UX Designer · MERN Stack Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=flat&logo=linkedin&labelColor=0f172a)](https://www.linkedin.com/in/muhammad-khuzaima-991a08313)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-333?style=flat&logo=github&labelColor=0f172a)](https://github.com/muhammadkhuzaima25)

---

## 📄 License

**All Rights Reserved.** Copyright © 2026 Muhammad Khuzaima.
This project is for **viewing and evaluation only.** See [LICENSE](./LICENSE) for full terms.

---

<p align="center">
  <strong>⭐ If WeekPlanr helped you organize your semester — please leave a star!</strong><br>
  <sub>Built from scratch with real debugging, designing, and grinding.<br>
  A star costs nothing but means everything. 🙏</sub>
</p>

<p align="center">
  <a href="https://github.com/muhammadkhuzaima25/WeekPlanr">
    <img src="https://img.shields.io/badge/⭐_Star_this_repo-Show_some_love-00C98A?style=for-the-badge&labelColor=0f172a" alt="Star this repo">
  </a>
</p>
