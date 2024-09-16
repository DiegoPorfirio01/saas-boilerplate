import { api } from './api-client'

interface ShutdownOrganizationRequest {
  org: string
}

export async function shutdown({ org }: ShutdownOrganizationRequest) {
  await api.delete(`organizations/${org}`)
}
