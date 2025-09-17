"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { apiRequest } from "@/lib/api"
import type { User, AuthResponse } from "@/types"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => void
  getToken: () => string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token")
    }
    return null
  }

  const setToken = (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token)
    }
  }

  const removeToken = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
    }
  }

  const fetchUser = async () => {
    const token = getToken()
    if (!token) {
      setLoading(false)
      return
    }

    try {
      const userData = await apiRequest<User>("/auth/me", "GET", undefined, token)
      setUser(userData)
    } catch (error) {
      console.error("Failed to fetch user:", error)
      removeToken()
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await apiRequest<AuthResponse>("/auth/login", "POST", {
        email,
        password,
      })

      setToken(response.token)
      setUser(response.user)
    } catch (error) {
      throw error
    }
  }

  const signup = async (email: string, password: string) => {
    try {
      const response = await apiRequest<AuthResponse>("/auth/signup", "POST", {
        email,
        password,
      })

      setToken(response.token)
      setUser(response.user)
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    removeToken()
    setUser(null)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    getToken,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
