import { api } from './api-client'

interface GetOrganizations {
  organizations: {
    slug: string
    id: string
    name: string
    avatarUrl: string | null
    role: 'ADMIN' | 'MEMBER' | 'BILLING'
  }[]
}

export async function getOrganizations() {
  const { organizations } = await api
    .get('organizations', {
      next: {
        tags: ['organizations'],
      },
    })
    .json<GetOrganizations>()

  return { organizations }
}
