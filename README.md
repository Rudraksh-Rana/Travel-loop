# 🌍 Traveloop

> **Plan. Explore. Loop.** — A personalized, intelligent travel planning platform for the modern Indian explorer.

![Traveloop Banner](https://picsum.photos/seed/traveloop-banner/1200/400)

---

## ✨ Overview

**Traveloop** is a full-stack travel planning web application that lets users create multi-city itineraries, manage budgets, discover curated Indian destinations, write travel journals, and share trip stories with the community — all within a cinematic, image-forward interface inspired by India's rich cultural heritage.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 16 (App Router), TypeScript, Tailwind CSS v4 |
| **UI Components** | Shadcn UI, Lucide Icons, Framer Motion |
| **Backend** | Node.js, Express.js, TypeScript |
| **Database** | MongoDB with Mongoose ODM |
| **Auth** | JWT (jsonwebtoken + bcryptjs) |
| **Fonts** | Zodiak (display), Satoshi (body) via Fontshare |

---

## 🎨 Design System

Inspired by **Musafir (Dribbble)** and **Travel Scouts India** — a warm, editorial, cinematic aesthetic.

- **Primary Color:** Terracotta `#C4521A`
- **Background:** Bone White `#FBF7F2`
- **Surface:** Earthy Cream `#F5EFE6`
- **Display Font:** Zodiak (Serif)
- **Body Font:** Satoshi (Sans-serif)

---

## 📁 Project Structure

```
Travel-loop/
├── frontend/               # Next.js 16 App
│   └── src/
│       ├── app/            # App Router pages
│       │   ├── page.tsx            # Landing page
│       │   ├── login/              # Auth pages
│       │   ├── register/
│       │   ├── dashboard/          # User dashboard
│       │   ├── trips/              # Trip management
│       │   │   ├── page.tsx        # All trips
│       │   │   ├── new/            # Create trip
│       │   │   └── [id]/           # Trip detail
│       │   │       ├── itinerary/  # Day-by-day builder
│       │   │       ├── notes/      # Travel journal
│       │   │       ├── budget/     # Expense tracker
│       │   │       └── checklist/  # Packing list
│       │   ├── search/             # Discover destinations
│       │   ├── community/          # Shared trip stories
│       │   └── profile/            # Travel identity
│       ├── components/     # Shared UI components
│       │   ├── Sidebar.tsx
│       │   ├── PageWrapper.tsx
│       │   └── AuthGuard.tsx
│       ├── context/        # Auth context (JWT)
│       └── lib/            # Centralized API service
│
└── backend/                # Express.js API
    └── src/
        ├── index.ts        # Server entry point
        ├── models/         # Mongoose models
        │   ├── User.ts
        │   ├── Trip.ts
        │   ├── Stop.ts
        │   ├── Activity.ts
        │   ├── Note.ts
        │   ├── BudgetItem.ts
        │   ├── ChecklistItem.ts
        │   ├── CommunityPost.ts
        │   ├── Destination.ts
        │   └── ExploreActivity.ts
        ├── routes/         # API route handlers
        │   ├── auth.ts
        │   ├── users.ts
        │   ├── trips.ts
        │   ├── stops.ts
        │   ├── notes.ts
        │   ├── budget.ts
        │   ├── checklist.ts
        │   ├── community.ts
        │   └── explore.ts
        ├── middleware/
        │   └── auth.ts     # JWT middleware
        └── seed.ts         # Database seeder (25 destinations, 30 activities)
```

---

## 🔌 API Endpoints

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login & get JWT |
| `GET` | `/api/auth/me` | Get current user |
| `GET/PUT` | `/api/users/:id` | User profile |
| `GET/POST` | `/api/trips` | List / create trips |
| `GET/PUT/DELETE` | `/api/trips/:id` | Trip detail |
| `GET/POST` | `/api/stops/:stopId/activities` | Stop activities |
| `GET/POST/DELETE` | `/api/notes/trip/:tripId` | Travel journal |
| `GET/POST/DELETE` | `/api/budget/trip/:tripId` | Budget items |
| `GET/POST/PUT/DELETE` | `/api/checklist/trip/:tripId` | Packing checklist |
| `GET/POST` | `/api/community` | Community feed |
| `POST` | `/api/community/:id/like` | Like a post |
| `GET` | `/api/explore/destinations` | Search destinations |
| `GET` | `/api/explore/activities` | Search activities |

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Clone the repo
```bash
git clone https://github.com/Rudraksh-Rana/Travel-loop.git
cd Travel-loop
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/traveloop
JWT_SECRET=your-secret-key-here
```

```bash
# Seed the database with 25 destinations & 30 activities
npx ts-node src/seed.ts

# Start the backend server
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
```

Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

### 4. Open the app
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api

---

## 🗺️ Key Features

| Feature | Description |
|---|---|
| 🔐 **JWT Auth** | Secure register/login with bcrypt password hashing |
| 🗺️ **Trip Builder** | Create multi-city itineraries with stops & activities |
| 📅 **Itinerary** | Day-by-day timeline with activity management |
| 💰 **Budget Ledger** | Expense tracking with category breakdown charts |
| 📓 **Travel Journal** | Rich notes with an editorial serif design |
| ✅ **Packing Checklist** | Categorized gear list with progress tracker |
| 🔍 **Discovery** | Search 25+ curated Indian destinations & 30+ activities |
| 🌐 **Community** | Share trip stories and browse the travel feed |
| 👤 **Travel Profile** | Personal identity card with trip statistics |

---

## 🌱 Database Seed

The seed script populates the database with curated Indian travel data:

```bash
cd backend
npx ts-node src/seed.ts
```

**Destinations include:** Jaipur, Udaipur, Jodhpur, Jaisalmer, Varanasi, Agra, Munnar, Alleppey, Hampi, Coorg, Goa, Manali, Leh, Rishikesh, Darjeeling, Amritsar, Andaman Islands, and more.

**Activities include:** Hot Air Balloon over Jaipur, Ganga Aarti, Houseboat Cruise, Desert Safari, White Water Rafting, Scuba Diving, Paragliding, Elephant Sanctuary, and more.

---

## 📄 License

MIT © [Rudraksh Rana](https://github.com/Rudraksh-Rana)
