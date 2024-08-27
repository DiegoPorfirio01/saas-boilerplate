import { api } from './api-client'

interface CreateOrganizationRequest {
  domain: string | null
  name: string
  shouldAttachUsersByDomain: boolean
}

type CreateOrganizationResponse = void

export async function createOrganization({
  domain,
  name,
  shouldAttachUsersByDomain,
}: CreateOrganizationRequest): Promise<CreateOrganizationResponse> {
  await api.post('organizations', {
    json: {
      domain,
      name,
      shouldAttachUsersByDomain,
    },
  })
}
