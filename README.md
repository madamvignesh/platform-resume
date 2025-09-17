
# 🚀 Resume Builder Platform

A **full-stack Resume Builder** where users can register, create, edit, and manage multiple versions of their resumes.
Built with **Next.js + TypeScript (frontend)** and **Node.js + Express + MongoDB (backend)**.

---

## 📂 Project Structure

```
.
├── backend/        # Express.js + MongoDB API
│   ├── models/     # Mongoose schemas (User, Resume)
│   ├── routes/     # Auth & Resume CRUD routes
│   ├── middleware/ # Authentication middleware
│   └── server.js   # Express app entry point
│
├── frontend/       # Next.js + TypeScript UI
│   ├── app/        # Next.js app router pages
│   ├── components/ # Reusable UI components
│   ├── hooks/      # Custom hooks (auth, data fetching)
│   └── lib/        # API utility (fetch wrapper)
│
└── README.md
```

---

## ⚙️ Features

* **Authentication**

  * User signup, login, JWT-based auth
  * `/auth/signup`, `/auth/login`, `/auth/me`

* **Resume Management**

  * Create new resume
  * Edit resume sections: personal info, education, experience, skills
  * Save multiple versions
  * Delete resumes
  * Download resume as **PDF**

* **Frontend (Next.js + TS)**

  * Protected routes
  * Dashboard to list resumes
  * Resume editor with live editing
  * Modern UI with Tailwind CSS

---

## 🛠️ Tech Stack

**Frontend**

* [Next.js 14](https://nextjs.org/) (App Router, Server/Client components)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)

**Backend**

* [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
* [JWT](https://jwt.io/) for authentication

---

## 🚀 Getting Started

### 1️⃣ Clone the repo

```bash
git clone https://github.com/yourusername/resume-builder.git
cd resume-builder
```

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/resume-builder
JWT_SECRET=your_jwt_secret
```

Run server:

```bash
npm start
```

Backend runs on → `http://localhost:4000`

---

### 3️⃣ Setup Frontend

```bash
cd ../frontend
npm install
```

Create `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Run frontend:

```bash
npm run dev
```

Frontend runs on → `http://localhost:3000`

---

## 📌 API Endpoints

### Authentication

* `POST /auth/signup` → Register new user
* `POST /auth/login` → Login & get token
* `GET /auth/me` → Get current user

### Resume

* `POST /resume` → Create resume
* `GET /resume` → Get all resumes
* `GET /resume/:id` → Get single resume
* `PUT /resume/:id` → Update resume
* `DELETE /resume/:id` → Delete resume
* `GET /resume/:id/download` → Download resume as PDF

---

## 🖼️ Screenshots

* **Dashboard**

  > Displays all resumes for the logged-in user

* **Resume Editor**

  > Edit personal info, education, experience, and skills

* **Download PDF**

  > Export your resume in PDF format

---

## 📖 Roadmap

* [ ] Add resume templates & themes
* [ ] Export in DOCX format
* [ ] Drag & Drop reordering of sections
* [ ] Share resume via public link

---

## 🤝 Contributing

1. Fork the repo
2. Create your branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -m "Added new feature"`)
4. Push to branch (`git push origin feature/your-feature`)
5. Open a PR

---

## 📜 License

MIT License © 2025

---
