import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/auth'
import { Header } from '@/components/header'
import Tabs from '@/components/tabs'

export default async function OrgLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
        <div className='pt-6'>
            <Header />
        </div>
        <Tabs />
        <main className='mx-auto w-full max-w-[1200px] py-4'>
            {children}
        </main>
    </>
  )
}
