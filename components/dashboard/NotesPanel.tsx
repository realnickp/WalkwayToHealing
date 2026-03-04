'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { addLeadNote } from '@/lib/actions/dashboard'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { MessageSquare, Loader2, Send } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface NoteItem {
  id: string
  note: string
  staff_name: string
  created_at: string
}

interface Props {
  leadId: string
  notes: NoteItem[]
}

export function NotesPanel({ leadId, notes }: Props) {
  const router = useRouter()
  const [note, setNote] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = () => {
    if (!note.trim()) return
    startTransition(async () => {
      try {
        await addLeadNote(leadId, note.trim())
        setNote('')
        router.refresh()
      } catch {
        alert('Failed to save note. Please try again.')
      }
    })
  }

  return (
    <div>
      <h3 className="flex items-center gap-2 font-semibold text-stone-900 mb-4">
        <MessageSquare className="h-4 w-4 text-primary" aria-hidden="true" />
        Notes
        <span className="text-xs text-stone-400 font-normal">({notes.length})</span>
      </h3>

      {/* Add note */}
      <div className="mb-5">
        <Textarea
          placeholder="Add a note about this lead…"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="min-h-[80px] resize-none"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit()
          }}
        />
        <div className="flex items-center justify-between mt-2">
          <span className="hidden sm:inline text-[11px] text-stone-400">Ctrl+Enter to save</span>
          <Button
            size="default"
            onClick={handleSubmit}
            disabled={!note.trim() || isPending}
            className="gap-1.5"
          >
            {isPending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
            ) : (
              <Send className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            Save Note
          </Button>
        </div>
      </div>

      {/* Notes list */}
      {notes.length === 0 ? (
        <p className="text-stone-400 text-sm text-center py-4">No notes yet</p>
      ) : (
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
          {notes.map((n) => (
            <div key={n.id} className="bg-cream rounded-xl p-4">
              <p className="text-sm text-stone-800 whitespace-pre-wrap leading-relaxed">{n.note}</p>
              <div className="flex items-center gap-2 mt-2 text-[11px] text-stone-400">
                <span className="font-medium">{n.staff_name}</span>
                <span>&middot;</span>
                <span>{formatDistanceToNow(new Date(n.created_at), { addSuffix: true })}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
