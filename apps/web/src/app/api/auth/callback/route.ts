import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { signInWithGitHub } from '@/http/sign-in-with-github'
import { acceptInvite } from '@/http/accept-invite'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      { message: 'GitHub OAuth code was not found' },
      { status: 400 },
    )
  }

  const { token } = await signInWithGitHub({ code })

  cookies().set('token', token, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  const inviteId = cookies().get('inviteId')?.value

  if(inviteId) {
    try {
      await acceptInvite({ inviteId })
      cookies().delete('inviteId')
    } catch (error) {
      
    }
  }

  const redirectUrl = request.nextUrl.clone()

  redirectUrl.pathname = '/'

  return NextResponse.redirect(redirectUrl)
}
