'use server'

import { getCurrentOrg } from '@/auth/auth'
import { createProject } from '@/http/create-project'
import { HTTPError } from 'ky'
import { z } from 'zod'


const projectSchema = z
  .object({
      name: z.string().min(1),
      description: z.string().min(1)
    },
  )

export async function createProjectAction(data: FormData) {
  const result = projectSchema.safeParse(Object.fromEntries(data))

  const orgSlug = getCurrentOrg()

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, description } = result.data

  await new Promise((resolve) => setTimeout(resolve, 2000))

  try {
    await createProject({
      name, description, orgSlug : orgSlug!
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
