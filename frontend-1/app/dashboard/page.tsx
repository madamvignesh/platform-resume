"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { apiRequest, ApiError } from "@/lib/api"
import type { Resume } from "@/types"
import ProtectedRoute from "@/components/ProtectedRoute"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function DashboardPage() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [newResumeTitle, setNewResumeTitle] = useState("")
  const [addingResume, setAddingResume] = useState(false)

  const { user, getToken } = useAuth()
  const router = useRouter()

  const fetchResumes = async () => {
    const token = getToken()
    if (!token) return

    try {
      setError("")
      const data = await apiRequest<Resume[]>("/resume", "GET", undefined, token)
      setResumes(data)
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message)
      } else {
        setError("Failed to load resumes")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleAddResume = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newResumeTitle.trim()) return

    const token = getToken()
    if (!token) return

    setAddingResume(true)
    try {
      const newResume = await apiRequest<Resume>(
        "/resume",
        "POST",
        {
          title: newResumeTitle.trim(),
        },
        token,
      )

      setResumes([...resumes, newResume])
      setNewResumeTitle("")
      setShowAddForm(false)
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message)
      } else {
        setError("Failed to create resume")
      }
    } finally {
      setAddingResume(false)
    }
  }

  const handleDeleteResume = async (resumeId: string) => {
    if (!confirm("Are you sure you want to delete this resume?")) return

    const token = getToken()
    if (!token) return

    try {
      await apiRequest(`/resume/${resumeId}`, "DELETE", undefined, token)
      setResumes(resumes.filter((resume) => resume._id !== resumeId))
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message)
        console.log(err)
      } else {
        setError("Failed to delete resume")
      }
    }
  }

  useEffect(() => {
    if (user) {
      fetchResumes()
    }
  }, [user])

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Resumes</h1>
            <p className="text-gray-600 mt-2">Manage and edit your professional resumes</p>
          </div>
          <button onClick={() => setShowAddForm(true)} className="btn-primary">
            Add Resume
          </button>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>}

        {/* Add Resume Form */}
        {showAddForm && (
          <div className="card mb-6">
            <h3 className="text-lg font-semibold mb-4">Create New Resume</h3>
            <form onSubmit={handleAddResume} className="flex gap-4">
              <input
                type="text"
                value={newResumeTitle}
                onChange={(e) => setNewResumeTitle(e.target.value)}
                placeholder="Enter resume title"
                className="input-field flex-1"
                required
              />
              <button
                type="submit"
                disabled={addingResume}
                className="btn-primary disabled:opacity-50 flex items-center gap-2"
              >
                {addingResume && <LoadingSpinner size="sm" />}
                {addingResume ? "Creating..." : "Create"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false)
                  setNewResumeTitle("")
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        ) : resumes.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No resumes yet</h3>
            <p className="text-gray-600 mb-6">Create your first resume to get started</p>
            <button onClick={() => setShowAddForm(true)} className="btn-primary">
              Create Your First Resume
            </button>
          </div>
        ) : (
          /* Resume Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div key={resume._id} className="card hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 text-balance">{resume.title}</h3>
                  <p className="text-sm text-gray-500">Created {new Date(resume.createdAt).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-500">
                    {resume.versions.length} version{resume.versions.length !== 1 ? "s" : ""}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Link href={`/resume/${resume._id}`} className="btn-primary text-sm flex-1 text-center">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteResume(resume._id)}
                    className="btn-secondary text-sm px-3 text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}
