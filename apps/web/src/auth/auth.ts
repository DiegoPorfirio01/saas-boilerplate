import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getProfile } from '@/http/get-profile'

export function isAuthenticated() {
  return !!cookies().get('token')?.value
}

export async function auth() {
  const token = cookies().get('token')?.value

  console.log(token)

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const currentUser = await getProfile()

    return currentUser
  } catch (error) {}

  redirect('api/auth/sign-out')
}
