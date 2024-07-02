'use server'

import { env } from '@saas/env'
import { getCookie } from 'cookies-next'
import type { CookiesFn } from 'cookies-next/lib/types'
import ky from 'ky'

export const api = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        let cookiesStore: CookiesFn | undefined

        if (typeof window === 'undefined') {
          const { cookies: serverCookies } = await import('next/headers')

          cookiesStore = serverCookies
        }

        const token = getCookie('token', { cookies: cookiesStore })

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})
