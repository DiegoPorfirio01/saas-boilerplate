import { api } from './api-client'

interface CreateOrganizationRequest {
  domain: string | null
  name: string
  shouldAttachUserByDomain: boolean
}

type CreateOrganizationResponse = void

export async function createOrganization({
  domain,
  name,
  shouldAttachUserByDomain,
}: CreateOrganizationRequest): Promise<CreateOrganizationResponse> {
  await api.post('organizations', {
    json: {
      domain,
      name,
      shouldAttachUserByDomain,
    },
  })
}
