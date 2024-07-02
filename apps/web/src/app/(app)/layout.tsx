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
      <div className="p-4">
        <Header />
        {children}
      </div>
    </>
  )
}
