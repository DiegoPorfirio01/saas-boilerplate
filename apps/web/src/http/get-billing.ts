import { api } from './api-client'

interface GetBillingResponse {
  billing: {
    seats: {
      amount: number
      unit: number
      price: number
    }
    projects: {
      amount: number
      unit: number
      price: number
    }
    total: number
  }
}

export async function getBilling(orgSlug: string) {
  const result = await api
    .get(`organizations/${orgSlug}/billing`, {
      next: {
        tags: [`${orgSlug}/billing`],
        revalidate: 60 * 60 * 24,
      },
    })
    .json<GetBillingResponse>()

  return result
}
