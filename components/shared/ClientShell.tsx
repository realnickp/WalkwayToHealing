'use client'

import { LoadingScreen } from './LoadingScreen'

export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoadingScreen />
      {children}
    </>
  )
}
