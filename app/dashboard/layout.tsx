import type { Metadata } from 'next'
import { getOptionalStaffUser } from '@/lib/actions/auth'
import { DashboardNav } from '@/components/dashboard/DashboardNav'

export const metadata: Metadata = {
  title: {
    default: 'Staff Dashboard — Walkway to Healing',
    template: '%s — Walkway to Healing Dashboard',
  },
  robots: { index: false, follow: false },
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const staff = await getOptionalStaffUser()

  // No staff session: render children bare (login page, or middleware redirect)
  if (!staff) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <DashboardNav staffName={staff.name} staffRole={staff.role} />
      <main className="flex-1 pb-24 md:pb-8">
        {children}
      </main>
    </div>
  )
}
