import { api } from './api-client'

interface GetOrganizationResponse {
  organization: {
    id: string;
    name: string;
    description: string | null;
    slug: string;
    domain: string | null;
    shouldAttachUsersByDomain: boolean;
    avatarUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    ownerId: string;
  }
}


export async function getOrganization(orgSlug: string) {
  const result = await api
    .get(`organizations/${orgSlug}`)
    .json<GetOrganizationResponse>()

  return result
}
