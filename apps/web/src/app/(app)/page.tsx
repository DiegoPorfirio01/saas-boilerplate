import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/auth'
import { Header } from '@/components/header'

export default function Home() {
  if (!isAuthenticated()) {
    return redirect('/auth/sign-in')
  }

  return (
    <>
      <div className="space-y-4 py-4">
        <Header />
        <main className="mx-auto w-full max-w-[1200px] space-y-4">
          <p className="text-sm text-muted-foreground">
            Selecione an organization
          </p>
        </main>
      </div>
    </>
  )
}
