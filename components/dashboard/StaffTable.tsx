'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toggleStaffActive, resetStaffPassword } from '@/lib/actions/dashboard'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Loader2, KeyRound, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { StaffUserRow } from '@/lib/supabase/types'

interface Props {
  staff: StaffUserRow[]
}

function StaffRow({ member }: { member: StaffUserRow }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [resetOpen, setResetOpen] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [resetDone, setResetDone] = useState(false)
  const [resetError, setResetError] = useState<string | null>(null)
  const [isResetting, startResetTransition] = useTransition()

  const handleToggle = () => {
    startTransition(async () => {
      await toggleStaffActive(member.id, !member.is_active)
      router.refresh()
    })
  }

  const handleResetPassword = () => {
    if (!newPassword.trim() || newPassword.length < 8) {
      setResetError('Password must be at least 8 characters')
      return
    }
    setResetError(null)
    startResetTransition(async () => {
      try {
        await resetStaffPassword(member.id, newPassword)
        setResetDone(true)
      } catch (err) {
        setResetError(err instanceof Error ? err.message : 'Failed to reset password')
      }
    })
  }

  const closeReset = () => {
    setResetOpen(false)
    setNewPassword('')
    setResetDone(false)
    setResetError(null)
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-stone-50 last:border-0">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <div className={cn(
              'h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
              member.is_active ? 'bg-primary-50 text-primary' : 'bg-stone-100 text-stone-400'
            )}>
              {member.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </div>
            <div>
              <p className={cn('text-sm font-semibold', member.is_active ? 'text-stone-900' : 'text-stone-400')}>
                {member.name}
              </p>
              <p className="text-xs text-stone-400">{member.email}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-0 sm:ml-4 w-full sm:w-auto justify-end sm:justify-start">
          <Badge variant={member.role === 'admin' ? 'default' : 'secondary'} className="capitalize hidden sm:inline-flex">
            {member.role}
          </Badge>
          <button
            onClick={() => setResetOpen(true)}
            className="p-2.5 min-h-[44px] min-w-[44px] rounded-lg text-stone-400 hover:bg-stone-50 hover:text-stone-600 transition-colors"
            aria-label={`Reset password for ${member.name}`}
            title="Reset password"
          >
            <KeyRound className="h-4 w-4" />
          </button>
          <button
            onClick={handleToggle}
            disabled={isPending}
            className={cn(
              'px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-medium transition-colors min-w-[70px] text-center',
              member.is_active
                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                : 'bg-green-50 text-green-600 hover:bg-green-100'
            )}
          >
            {isPending ? (
              <Loader2 className="h-3 w-3 animate-spin mx-auto" />
            ) : member.is_active ? 'Disable' : 'Enable'}
          </button>
        </div>
      </div>

      {/* Reset password dialog */}
      <Dialog open={resetOpen} onOpenChange={(val) => !val && closeReset()}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display text-lg">Reset Password</DialogTitle>
          </DialogHeader>

          {resetDone ? (
            <div className="text-center py-4 space-y-3">
              <Check className="h-10 w-10 text-green-500 mx-auto" />
              <p className="font-medium text-stone-900">Password updated</p>
              <p className="text-sm text-stone-500">
                {member.name} can now log in with the new password.
              </p>
              <Button onClick={closeReset} className="w-full">Done</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-stone-600">
                Set a new password for <strong>{member.name}</strong>
              </p>

              {resetError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                  {resetError}
                </div>
              )}

              <Input
                type="text"
                placeholder="New password (min 8 characters)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                minLength={8}
                autoFocus
              />

              <Button
                onClick={handleResetPassword}
                className="w-full"
                disabled={isResetting || newPassword.length < 8}
              >
                {isResetting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Updating…
                  </>
                ) : 'Reset Password'}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export function StaffTable({ staff }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
      {staff.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-stone-500 font-medium">No staff members yet</p>
          <p className="text-stone-400 text-sm mt-1">Add your first staff member above.</p>
        </div>
      ) : (
        staff.map((member) => (
          <StaffRow key={member.id} member={member} />
        ))
      )}
    </div>
  )
}
