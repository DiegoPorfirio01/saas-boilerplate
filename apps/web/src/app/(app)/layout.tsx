import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/auth'
import { Header } from '@/components/header'

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (!isAuthenticated()) {
    return redirect('/auth/sign-in')
  }

  return (
    <>
      <div className="space-y-4 py-4">
        <Header />
        <div className="mx-auto w-full max-w-[1200px]">{children}</div>
      </div>
    </>
  )
}
