# Resume Platform Frontend

A Next.js frontend for the Resume Platform MERN application.

## Features

- User authentication (login/signup)
- Resume management dashboard
- Resume editor with personal info, education, experience, and skills
- PDF download functionality
- Responsive design with Tailwind CSS

## Prerequisites

- Node.js 18+
- Resume Platform backend running on port 4000

## Setup Instructions

1. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Environment setup:**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Update `.env.local` with your backend URL:
   \`\`\`
   NEXT_PUBLIC_API_URL=http://localhost:4000
   \`\`\`

3. **Start development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Demo Credentials

Use these credentials to test the application:

- **Email:** hire-me@anshumat.org
- **Password:** HireMe@2025!

## Usage

1. **Login:** Use the demo credentials or create a new account
2. **Dashboard:** View and manage your resumes
3. **Create Resume:** Click "Add Resume" to create a new resume
4. **Edit Resume:** Click on any resume to edit its content
5. **Download PDF:** Use the "Download PDF" button in the resume editor

## API Integration

The frontend communicates with the backend API using these endpoints:

- `POST /auth/login` - User login
- `POST /auth/signup` - User registration
- `GET /auth/me` - Get current user
- `GET /resume` - List user's resumes
- `POST /resume` - Create new resume
- `GET /resume/:id` - Get single resume
- `PUT /resume/:id` - Update resume
- `DELETE /resume/:id` - Delete resume
- `GET /resume/:id/download?versionIndex=0` - Download PDF

## PDF Download

The PDF download opens in a new tab using:
\`\`\`javascript
window.open(`${NEXT_PUBLIC_API_URL}/resume/${id}/download?versionIndex=0`, '_blank')
\`\`\`

Note: For production deployments, you may need server-side token handling for direct download endpoints if the backend requires authentication headers that browsers can't send via direct navigation.

## Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Project Structure

\`\`\`
├── app/
│   ├── dashboard/
│   ├── login/
│   ├── resume/[id]/
│   ├── signup/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── hooks/
│   └── useAuth.tsx
├── lib/
│   └── api.ts
├── types/
│   └── index.ts
└── README.md
