'use server'

import { getCurrentOrg } from "@/auth/auth"
import { deleteMember } from "@/http/remove-member"
import { revokeInvite } from "@/http/revoke-invite"
import { updateMemberRole } from "@/http/update-member"
import type { Role } from "@saas/auth"
import { revalidateTag } from "next/cache"

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