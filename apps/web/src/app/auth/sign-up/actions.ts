'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { signUp } from '@/http/sign-up'

const signUpSchema = z
  .object({
    email: z
      .string()
      .email({ message: 'Please, provide a valid e-mail address' }),
    name: z.string().refine((data) => data.split(' ').length > 1, {
      message: 'Please, enter your full name',
    }),
    password: z.string().min(1, { message: 'Please, provide your password' }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Password confirmation does not match',
    path: ['password_confirmation'],
  })

export async function signUpAction(data: FormData) {
  const result = signUpSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, email, password } = result.data

  await new Promise((resolve) => setTimeout(resolve, 2000))

  try {
    await signUp({
      email,
      password,
      name,
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes',
      errors: null,
    }
  }
  return {
    success: true,
    message: null,
    errors: null,
  }
}
