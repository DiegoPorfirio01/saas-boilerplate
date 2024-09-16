import { api } from './api-client'

interface DeleteMemberRequest {
  orgSlug: string
  userId: string
}

type DeleteMemberResponse = void

export async function deleteMember({
  orgSlug,
  userId,
}: DeleteMemberRequest): Promise<DeleteMemberResponse> {
  await api.delete(`organizations/${orgSlug}/member/${userId}`)
}
