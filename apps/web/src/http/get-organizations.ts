import { api } from './api-client'

interface GetOrganization {
  organizations: {
    slug: string
    id: string
    name: string
    avatarUrl: string | null
    role: 'ADMIN' | 'MEMBER' | 'BILLING'
  }[]
}

export async function getOrganization() {
  const { organizations } = await api
    .get('organizations')
    .json<GetOrganization>()

  return { organizations }
}
