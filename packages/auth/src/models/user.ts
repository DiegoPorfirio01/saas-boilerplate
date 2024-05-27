import { z } from 'zod'

import { roleSchema } from '../roles'

export const userSchema = z.object({
  role: roleSchema,
  id: z.string(),
})

export type User = z.infer<typeof userSchema>
