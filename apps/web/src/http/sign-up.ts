import { api } from './api-client'

interface SignUpRequest {
  email: string
  password: string
  name: string
}

type SignUpResponse = void

export async function signUp({
  name,
  email,
  password,
}: SignUpRequest): Promise<SignUpResponse> {
  await api.post('users', {
    json: {
      email,
      password,
      name,
    },
  })
}
