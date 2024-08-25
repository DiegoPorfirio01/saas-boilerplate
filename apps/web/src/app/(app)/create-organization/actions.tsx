'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { createOrganization } from '@/http/create-organization'

const organizationSchema = z
  .object({
    name: z.string().min(1),
    domain: z
      .string()
      .nullable()
      .refine(
        (value) => {
          if (value) {
            const domainRegex =
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

            return domainRegex.test(value)
          }

          return true
        },
        { message: 'The domain should follow the format: example.com' },
      ),
    shouldAttachUserByDomain: z
      .union([z.literal('on'), z.literal('of'), z.boolean()])
      .transform((value) => value === true || value === 'on')
      .default(false),
  })
  .refine(
    (item) => {
      if (!item.domain) {
        return item.shouldAttachUserByDomain === false
      }
      return true
    },
    {
      message:
        'If you checked should attach user by domain, you need put the domain of orgnization',
    },
  )

export async function createOrganizationAction(data: FormData) {
  const result = organizationSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, domain, shouldAttachUserByDomain } = result.data

  await new Promise((resolve) => setTimeout(resolve, 2000))

  try {
    await createOrganization({
      name,
      domain,
      shouldAttachUserByDomain,
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
