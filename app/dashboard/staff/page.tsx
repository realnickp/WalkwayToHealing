import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getStaffUser } from '@/lib/actions/auth'
import { getStaffList } from '@/lib/actions/dashboard'
import { StaffTable } from '@/components/dashboard/StaffTable'
import { InviteStaffDialog } from '@/components/dashboard/InviteStaffDialog'
import { UserCog } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Staff Management',
  robots: { index: false, follow: false },
}

export default async function StaffPage() {
  let staff
  try {
    staff = await getStaffUser()
  } catch {
    redirect('/dashboard/login')
  }

  if (staff.role !== 'admin') {
    redirect('/dashboard')
  }

  const staffList = await getStaffList()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 flex items-center gap-2">
            <UserCog className="h-6 w-6 text-primary" aria-hidden="true" />
            Staff
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            {staffList.length} member{staffList.length !== 1 ? 's' : ''} &middot; Manage access and roles
          </p>
        </div>
        <InviteStaffDialog />
      </div>

      <StaffTable staff={staffList} />

      <div className="mt-6 bg-primary-50 rounded-xl p-4 border border-primary-100">
        <h3 className="font-semibold text-primary text-sm mb-1">How to add a new staff member</h3>
        <ol className="text-xs text-primary-700 space-y-1 list-decimal list-inside leading-relaxed">
          <li>Click <strong>&ldquo;Add Staff&rdquo;</strong> and enter their name, email, password, and role.</li>
          <li>Copy the login credentials and share them with the staff member.</li>
          <li>They can log in immediately — no setup needed on their end.</li>
          <li>To remove access, click the <strong>Disable</strong> button next to their name.</li>
        </ol>
      </div>
    </div>
  )
}
