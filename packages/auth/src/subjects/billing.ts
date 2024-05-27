import { z } from 'zod'

export const billingSubject = z.tuple([
  z.union([z.literal('get'), z.literal('export'), z.literal('manage')]),
  z.literal('Billing'),
])

export type BillingSubject = z.infer<typeof billingSubject>
