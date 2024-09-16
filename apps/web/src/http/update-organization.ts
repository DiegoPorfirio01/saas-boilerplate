import { api } from './api-client'

interface UpdateOrganizationRequest {
  org: string
  domain: string | null
  name: string
  shouldAttachUsersByDomain: boolean
}

type UpdateOrganizationResponse = void

export async function updateOrganization({
  org,
  domain,
  name,
  shouldAttachUsersByDomain,
}: UpdateOrganizationRequest): Promise<UpdateOrganizationResponse> {
  console.log('heeelooo', shouldAttachUsersByDomain)

  await api.put(`organizations/${org}`, {
    json: {
      domain,
      name,
      shouldAttachUsersByDomain,
    },
  })
}
