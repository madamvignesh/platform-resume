"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { apiRequest, ApiError } from "@/lib/api"
import type { Resume, ResumeVersion, Education, Experience } from "@/types"
import ProtectedRoute from "@/components/ProtectedRoute"
import LoadingSpinner from "@/components/LoadingSpinner"

interface ResumeEditorProps {
  resumeId: string
}

export default function ResumeEditor({ resumeId }: ResumeEditorProps) {
  const [resume, setResume] = useState<Resume | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const { user, getToken } = useAuth()
  const router = useRouter()

  // Redirect if not logged in
  useEffect(() => {
    if (!user && !loading) {
      router.push("/login")
    }
  }, [user, loading, router])

  const fetchResume = async () => {
    const token = getToken()
    if (!token) return
    try {
      setError("")
      const data = await apiRequest<Resume>(`/resume/${resumeId}`, "GET", undefined, token)
      setResume(data)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load resume")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!resume) return
    const token = getToken()
    if (!token) return
    setSaving(true)
    setError("")
    setSuccessMessage("")
    try {
      const updatedResume = await apiRequest<Resume>(`/resume/${resumeId}`, "PUT", resume, token)
      setResume(updatedResume)
      setSuccessMessage("Resume saved successfully!")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to save resume")
    } finally {
      setSaving(false)
    }
  }

  const handleDownloadPDF = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"
    const downloadUrl = `${apiUrl}/resume/${resumeId}/download?versionIndex=0`
    window.open(downloadUrl, "_blank")
  }

  // === Resume field update helpers ===
  const updateResumeTitle = (title: string) => {
    if (!resume) return
    setResume({ ...resume, title })
  }

  const updateVersion = (updatedVersion: ResumeVersion) => {
    if (!resume) return
    const versions = [...resume.versions]
    if (versions.length === 0) {
      versions.push(updatedVersion)
    } else {
      versions[0] = updatedVersion
    }
    setResume({ ...resume, versions })
  }

  const addEducation = () => {
    if (!resume || resume.versions.length === 0) return
    const version = resume.versions[0]
    const newEducation: Education = {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      gpa: "",
    }
    updateVersion({ ...version, education: [...version.education, newEducation] })
  }

  const updateEducation = (index: number, education: Education) => {
    if (!resume || resume.versions.length === 0) return
    const version = resume.versions[0]
    const updatedEducation = [...version.education]
    updatedEducation[index] = education
    updateVersion({ ...version, education: updatedEducation })
  }

  const removeEducation = (index: number) => {
    if (!resume || resume.versions.length === 0) return
    const version = resume.versions[0]
    const updatedEducation = version.education.filter((_, i) => i !== index)
    updateVersion({ ...version, education: updatedEducation })
  }

  const addExperience = () => {
    if (!resume || resume.versions.length === 0) return
    const version = resume.versions[0]
    const newExperience: Experience = {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
      location: "",
    }
    updateVersion({ ...version, experience: [...version.experience, newExperience] })
  }

  const updateExperience = (index: number, experience: Experience) => {
    if (!resume || resume.versions.length === 0) return
    const version = resume.versions[0]
    const updatedExperience = [...version.experience]
    updatedExperience[index] = experience
    updateVersion({ ...version, experience: updatedExperience })
  }

  const removeExperience = (index: number) => {
    if (!resume || resume.versions.length === 0) return
    const version = resume.versions[0]
    const updatedExperience = version.experience.filter((_, i) => i !== index)
    updateVersion({ ...version, experience: updatedExperience })
  }

  const updateSkills = (skills: string[]) => {
    if (!resume || resume.versions.length === 0) return
    const version = resume.versions[0]
    updateVersion({ ...version, skills })
  }

  // === Lifecycle ===
  useEffect(() => {
    if (user) {
      fetchResume()
    }
  }, [user, resumeId])

  useEffect(() => {
    if (resume && resume.versions.length === 0) {
      const emptyVersion: ResumeVersion = {
        personal: { fullName: "", email: "", phone: "", address: "", linkedin: "", github: "" },
        education: [],
        experience: [],
        skills: [],
      }
      updateVersion(emptyVersion)
    }
  }, [resume])

  // === UI states ===
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="card space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error && !resume) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>
      </div>
    )
  }

  if (!resume) return null

  const version = resume.versions[0] || {
    personal: { fullName: "", email: "" },
    education: [],
    experience: [],
    skills: [],
  }

  // === Render Editor ===
  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1 mr-4">
            <input
              type="text"
              value={resume?.title || ""}
              onChange={(e) => updateResumeTitle(e.target.value)}
              className="text-3xl font-bold text-gray-900 bg-transparent border-none outline-none focus:bg-white focus:border focus:border-gray-300 focus:rounded px-2 py-1 w-full text-balance"
              placeholder="Resume Title"
            />
            <p className="text-gray-600 mt-2">Edit your resume details below</p>
          </div>
          <div className="flex gap-3">
            <button onClick={handleDownloadPDF} className="btn-secondary" title="Download PDF in new tab">
              Download PDF
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary disabled:opacity-50 flex items-center gap-2"
            >
              {saving && <LoadingSpinner size="sm" />}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Messages */}
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
            {successMessage}
          </div>
        )}

        {/* === Resume sections === */}
        {/* Personal, Education, Experience, Skills (keep your existing UI code here) */}
        {/* 👆 all the section UI stays exactly like your code, no need to change it */}
      </div>
    </ProtectedRoute>
  )
}
