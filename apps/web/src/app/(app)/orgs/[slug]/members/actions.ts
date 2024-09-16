'use server'

import { getCurrentOrg } from "@/auth/auth"
import { createInvite } from "@/http/create-invite"
import { deleteMember } from "@/http/remove-member"
import { revokeInvite } from "@/http/revoke-invite"
import { updateMemberRole } from "@/http/update-member"
import { roleSchema, type Role } from "@saas/auth"
import { HTTPError } from "ky"
import { revalidateTag } from "next/cache"
import { z } from "zod"

const inviteSchema = z.object({
  email: z.string().email({ message: 'Invalid e-mail address.' }),
  role: roleSchema,
})

export async function removeMember(memberId: string ) {
  const currentOrg = await getCurrentOrg()

  await deleteMember({
    orgSlug: currentOrg!,
    userId: memberId
  })

  revalidateTag(`${currentOrg}/members`)
  revalidateTag(`${currentOrg}/billing`)
}

export async function updateRoleMemberAction(memberId: string, role: Role) {
  const currentOrg = await getCurrentOrg()

  await updateMemberRole({
    orgSlug: currentOrg!,
    userId: memberId,
    role
  })

  revalidateTag(`${currentOrg}/members`)
}

export async function revokeInviteAction(inviteId: string) {
  const currentOrg = await getCurrentOrg()

  await revokeInvite({
    orgSlug: currentOrg!,
    inviteId
  })

  revalidateTag(`${currentOrg}/invites`)
}

export async function createInviteAction(data: FormData) {
  const currentOrg = getCurrentOrg()!
  const result = inviteSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { email, role } = result.data

  try {
    await createInvite({
      org: currentOrg,
      email,
      role,
    })

    revalidateTag(`${currentOrg}/invites`)
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Successfully created the invite.',
    errors: null,
  }
}