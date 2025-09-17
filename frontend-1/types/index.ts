export interface User {
  _id: string
  email: string
  createdAt: string
  updatedAt: string
}

export interface PersonalInfo {
  fullName: string
  email: string
  phone?: string
  address?: string
  linkedin?: string
  github?: string
}

export interface Education {
  institution: string
  degree: string
  fieldOfStudy: string
  startDate: string
  endDate: string
  gpa?: string
}

export interface Experience {
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
  location?: string
}

export interface ResumeVersion {
  personal: PersonalInfo
  education: Education[]
  experience: Experience[]
  skills: string[]
}

export interface Resume {
  _id: string
  title: string
  userId: string
  versions: ResumeVersion[]
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface ApiError {
  message: string
  status: number
}
