'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { LayoutDashboard, Users, Settings, LogOut, UserCog } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createBrowserClient } from '@supabase/ssr'

interface Props {
  staffName: string
  staffRole: 'admin' | 'staff'
}

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/leads', label: 'Leads', icon: Users },
]

const ADMIN_ITEMS = [
  { href: '/dashboard/staff', label: 'Staff', icon: UserCog },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export function DashboardNav({ staffName, staffRole }: Props) {
  const pathname = usePathname()
  const router = useRouter()

  const allItems = staffRole === 'admin'
    ? [...NAV_ITEMS, ...ADMIN_ITEMS]
    : NAV_ITEMS

  const handleLogout = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    await supabase.auth.signOut()
    router.push('/dashboard/login')
    router.refresh()
  }

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Desktop top bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-stone-200 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2.5">
              <div className="relative h-8 w-8">
                <Image src="/logo.png" alt="Walkway to Healing" fill className="object-contain" sizes="32px" />
              </div>
              <span className="font-display text-lg font-bold text-stone-900">Dashboard</span>
            </Link>

            <nav className="flex items-center gap-1">
              {allItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive(item.href)
                      ? 'bg-primary-50 text-primary'
                      : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                  )}
                >
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary-50 text-primary flex items-center justify-center text-xs font-bold">
                {staffName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-stone-800 leading-none">{staffName}</p>
                <p className="text-[11px] text-stone-400 capitalize">{staffRole}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-stone-500 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only sm:not-sr-only">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile top bar (simplified) */}
      <header className="sticky top-0 z-50 bg-white border-b border-stone-200 md:hidden">
        <div className="px-4 h-14 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="relative h-7 w-7">
              <Image src="/logo.png" alt="Walkway to Healing" fill className="object-contain" sizes="28px" />
            </div>
            <span className="font-display text-base font-bold text-stone-900">Dashboard</span>
          </Link>
          <button
            onClick={handleLogout}
            className="p-3 rounded-lg text-stone-500 hover:bg-red-50 hover:text-red-600 transition-colors"
            aria-label="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-200 md:hidden safe-area-bottom">
        <div className="flex items-center justify-around overflow-x-auto py-2">
          {allItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-0.5 py-2 px-3 min-h-[44px] rounded-lg text-xs font-medium transition-colors min-w-[60px] shrink-0',
                  active ? 'text-primary' : 'text-stone-400'
                )}
              >
                <item.icon className={cn('h-5 w-5', active && 'text-primary')} />
                {item.label}
                {active && (
                  <motion.div
                    layoutId="mobile-tab"
                    className="absolute -top-0.5 h-0.5 w-8 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
