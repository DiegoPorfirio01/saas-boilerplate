import { api } from './api-client'

interface RevokeInviteRequest {
  inviteId: string
  orgSlug: string
}

type RevokeInviteResponse = void

export async function revokeInvite({
  inviteId,
  orgSlug
}: RevokeInviteRequest): Promise<RevokeInviteResponse> {
  await api.delete(`organizations/${orgSlug}/invites/${inviteId}`)
}
