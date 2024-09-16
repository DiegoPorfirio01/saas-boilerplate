import type { Role } from '@saas/auth'

import { api } from './api-client'

interface UpdateMemberRequest {
  orgSlug: string
  userId: string
  role: Role
}

type UpdateMemberResponse = void

export async function updateMemberRole({
  orgSlug,
  userId,
  role,
}: UpdateMemberRequest): Promise<UpdateMemberResponse> {
  await api.put(`organizations/${orgSlug}/members/${userId}`, {
    json: {
      role,
    },
  })
}
