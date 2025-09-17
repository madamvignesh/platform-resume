// app/resume/[id]/page.tsx
import ResumeEditor from "./resumeEditor"

export default function Page({ params }: { params: { id: string } }) {
  return <ResumeEditor resumeId={params.id} />
}
