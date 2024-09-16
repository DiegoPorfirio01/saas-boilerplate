'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Role } from "@saas/auth"
import type { ComponentProps } from "react"
import { updateRoleMemberAction } from "./action"

interface UpdateMemberRoleSelectProps extends ComponentProps<typeof Select> {
  memberId: string
}

export const UpdateMemberRoleSelect = ({memberId, ...props} : UpdateMemberRoleSelectProps) => {
  async function updateRole(role: Role) {
    await updateRoleMemberAction(memberId, role)
  }

  return (
    <Select onValueChange={updateRole} {...props}>
      <SelectTrigger>
       <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='ADMIN'>Admin</SelectItem>
        <SelectItem value='MEMBER'>Member</SelectItem>
        <SelectItem value='BILLING'>Billing</SelectItem>
      </SelectContent>
    </Select>
  )
}
