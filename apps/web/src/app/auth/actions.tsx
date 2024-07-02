'use server'

import { env } from '@saas/env'
import { redirect } from 'next/navigation'

export async function signInWithGithub() {
  const githubSignURL = new URL('login/oauth/authorize', 'https://github.com')

  githubSignURL.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
  githubSignURL.searchParams.set(
    'redirect_uri',
    `${env.GITHUB_OAUTH_CLIENT_REDIRECT_URI}`,
  )

  githubSignURL.searchParams.set('scope', 'user')

  redirect(githubSignURL.toString())
}
