import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getStaffUser } from '@/lib/actions/auth'
import Link from 'next/link'
import { Settings, Users, Shield, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Settings',
  robots: { index: false, follow: false },
}

export default async function SettingsPage() {
  let staff
  try {
    staff = await getStaffUser()
  } catch {
    redirect('/dashboard/login')
  }

  if (staff.role !== 'admin') {
    redirect('/dashboard')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 flex items-center gap-2 mb-8">
        <Settings className="h-6 w-6 text-primary" aria-hidden="true" />
        Settings
      </h1>

      <div className="space-y-4">
        <Link
          href="/dashboard/staff"
          className="flex items-center gap-4 bg-white rounded-2xl border border-stone-100 p-5 hover:shadow-md hover:border-stone-200 transition-all group"
        >
          <div className="h-10 w-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-stone-900 group-hover:text-primary transition-colors">Staff Management</p>
            <p className="text-xs text-stone-500">Invite members, manage roles and access</p>
          </div>
        </Link>

        <div className="flex items-center gap-4 bg-white rounded-2xl border border-stone-100 p-5 opacity-60">
          <div className="h-10 w-10 rounded-xl bg-stone-50 flex items-center justify-center shrink-0">
            <Mail className="h-5 w-5 text-stone-400" />
          </div>
          <div>
            <p className="font-semibold text-stone-500">Email Notifications</p>
            <p className="text-xs text-stone-400">Configured via SendGrid</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white rounded-2xl border border-stone-100 p-5 opacity-60">
          <div className="h-10 w-10 rounded-xl bg-stone-50 flex items-center justify-center shrink-0">
            <Shield className="h-5 w-5 text-stone-400" />
          </div>
          <div>
            <p className="font-semibold text-stone-500">Security & Compliance</p>
            <p className="text-xs text-stone-400">42 CFR Part 2 &amp; HIPAA protections are built in</p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-cream rounded-xl p-5 border border-stone-200">
        <h3 className="font-semibold text-stone-900 text-sm mb-2">Your Account</h3>
        <div className="space-y-1 text-sm">
          <p><span className="text-stone-400 w-16 inline-block">Name:</span> <span className="text-stone-800">{staff.name}</span></p>
          <p><span className="text-stone-400 w-16 inline-block">Email:</span> <span className="text-stone-800">{staff.email}</span></p>
          <p><span className="text-stone-400 w-16 inline-block">Role:</span> <span className="text-stone-800 capitalize">{staff.role}</span></p>
        </div>
      </div>
    </div>
  )
}
