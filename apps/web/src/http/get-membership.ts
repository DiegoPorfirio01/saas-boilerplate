import { Role } from '@saas/auth'

import { api } from './api-client'

interface GetCurrentOrgResponse {
  membership: {
    id: string
    userId: string
    organizationId: string
    role: Role
  }
}

export async function getMembership(slug: string) {
  const result = await api
    .get(`organizations/${slug}/membership`)
    .json<GetCurrentOrgResponse>()

  return result
}
