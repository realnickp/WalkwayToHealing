'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { inviteStaffMember } from '@/lib/actions/dashboard'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { UserPlus, Loader2, CheckCircle, Eye, EyeOff, Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function InviteStaffDialog() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState<'staff' | 'admin'>('staff')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isPending, startTransition] = useTransition()

  // Store credentials to display after success
  const [createdCreds, setCreatedCreds] = useState<{ email: string; password: string; name: string } | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !name.trim() || !password.trim()) return

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setError(null)
    startTransition(async () => {
      try {
        await inviteStaffMember(email.trim(), name.trim(), role, password)
        setCreatedCreds({ email: email.trim(), password, name: name.trim() })
        setSuccess(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to create staff member')
      }
    })
  }

  const handleCopy = () => {
    if (!createdCreds) return
    const text = `Login credentials for ${createdCreds.name}:\nEmail: ${createdCreds.email}\nPassword: ${createdCreds.password}\nLogin at: ${window.location.origin}/dashboard/login`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClose = () => {
    setOpen(false)
    setSuccess(false)
    setCreatedCreds(null)
    setEmail('')
    setName('')
    setPassword('')
    setRole('staff')
    setError(null)
    setCopied(false)
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={(val) => val ? setOpen(true) : handleClose()}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" aria-hidden="true" />
          Add Staff
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-lg">
            {success ? 'Account Created' : 'Add Staff Member'}
          </DialogTitle>
        </DialogHeader>

        {success && createdCreds ? (
          <div className="space-y-4">
            <div className="text-center py-2">
              <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-3" />
              <p className="font-medium text-stone-900">
                {createdCreds.name} is ready to go
              </p>
            </div>

            <div className="bg-cream rounded-xl p-4 space-y-2 border border-stone-200">
              <p className="text-xs text-stone-400 font-medium uppercase tracking-wider">Login Credentials</p>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-stone-500">Email</span>
                  <span className="text-sm font-medium text-stone-800">{createdCreds.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-stone-500">Password</span>
                  <span className="text-sm font-mono font-medium text-stone-800">{createdCreds.password}</span>
                </div>
              </div>
            </div>

            <Button onClick={handleCopy} variant="outline" className="w-full gap-2">
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-500" aria-hidden="true" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" aria-hidden="true" />
                  Copy Credentials
                </>
              )}
            </Button>

            <p className="text-xs text-stone-400 text-center">
              Share these credentials securely. The staff member can log in immediately.
            </p>

            <Button onClick={handleClose} className="w-full">
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                {error}
              </div>
            )}

            <div>
              <Label htmlFor="staff-name">Full Name</Label>
              <Input
                id="staff-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                required
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="staff-email">Email</Label>
              <Input
                id="staff-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@walkwaytohealing.com"
                required
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="staff-password">Password</Label>
              <div className="relative mt-1.5">
                <Input
                  id="staff-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-[11px] text-stone-400 mt-1">
                You&apos;ll share this with the staff member so they can log in.
              </p>
            </div>

            <div>
              <Label>Role</Label>
              <div className="grid grid-cols-2 gap-2 mt-1.5">
                {(['staff', 'admin'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={cn(
                      'py-3 rounded-xl border-2 text-sm font-medium transition-all capitalize',
                      role === r
                        ? 'border-primary bg-primary-50 text-primary'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" aria-hidden="true" />
                  Creating…
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
