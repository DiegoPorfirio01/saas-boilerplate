import { XOctagon } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'

import { revokeInviteAction } from './actions'

interface RevokeInviteButtonProps {
  inviteId: string
}

export const RevokeInviteButton = async ({
  inviteId,
}: RevokeInviteButtonProps) => {
  return (
    <form action={revokeInviteAction.bind(null, inviteId)}>
      <Button size={'sm'} variant={'destructive'}>
        <XOctagon className="mr-2 size-4" />
        Revoke
      </Button>
    </form>
  )
}
