import type { Role } from '@saas/auth'

import { api } from './api-client'

interface GetMembersResponse {
  members: {
    userId: string
    name: string | null
    avatarUrl: string | null
    email: string
    id: string
    role: Role
  }[]
}

export async function getMembers(orgSlug: string) {
  const result = await api
    .get(`organizations/${orgSlug}/members`, {
      next: {
        tags: [`${orgSlug}/members`],
        revalidate: 60 * 60 * 24,
      },
    })
    .json<GetMembersResponse>()

  return result
}
