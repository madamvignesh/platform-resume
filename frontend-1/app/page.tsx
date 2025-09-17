import Link from "next/link"

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      {/* Hero Section */}
      <div className="mb-16">
        <h1 className="text-5xl font-bold text-foreground mb-6 text-balance">
          Build Professional Resumes
          <span className="text-primary"> That Get You Hired</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
          Create, edit, and manage multiple versions of your resume with our intuitive platform. Export to PDF and land
          your dream job.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup" className="btn-primary text-lg px-8 py-3">
            Get Started Free
          </Link>
          <Link href="/login" className="btn-secondary text-lg px-8 py-3">
            Sign In
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="card text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Easy Editing</h3>
          <p className="text-muted-foreground">
            Intuitive interface to add your personal info, education, experience, and skills.
          </p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Multiple Versions</h3>
          <p className="text-muted-foreground">
            Create different versions of your resume for different job applications.
          </p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">PDF Export</h3>
          <p className="text-muted-foreground">
            Download your resume as a professional PDF ready for job applications.
          </p>
        </div>
      </div>

      {/* Demo Credentials */}
      <div className="card max-w-md mx-auto bg-primary/5 border-primary/20">
        <h3 className="text-lg font-semibold mb-3 text-primary">Try Demo Account</h3>
        <div className="text-sm text-foreground space-y-1">
          <p>
            <strong>Email:</strong> hire-me@anshumat.org
          </p>
          <p>
            <strong>Password:</strong> HireMe@2025!
          </p>
        </div>
      </div>
    </div>
  )
}
