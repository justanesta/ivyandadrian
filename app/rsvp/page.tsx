// app/rsvp/page.tsx
// Server component wrapper for the code-only entry page.
// Renders a single input form that navigates to the personalized link.

import RSVPCodeForm from '@/components/RSVPCodeForm'

export default function RSVPIndexPage() {
  return (
    <main className="container py-5" style={{ maxWidth: 720 }}>
      <h1 className="h1 mb-3">Find your RSVP</h1>
      <p className="text-muted mb-4">
        Enter the short word on your invitation (to be sent in early 2026) to reach your personalized RSVP page.
      </p>
      <RSVPCodeForm />
    </main>
  )
}