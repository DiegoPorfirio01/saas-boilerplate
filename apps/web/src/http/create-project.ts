import { revalidateTag } from 'next/cache'

import { api } from './api-client'

interface CreateProjectRequest {
  description: string
  name: string
  orgSlug: string
}

type CreateProjectResponse = void

export async function createProject({
  name,
  description,
  orgSlug,
}: CreateProjectRequest): Promise<CreateProjectResponse> {
  await api.post(`organizations/${orgSlug}/projects`, {
    json: {
      name,
      description,
    },
  })

  revalidateTag(`${orgSlug}/billing`)
}
