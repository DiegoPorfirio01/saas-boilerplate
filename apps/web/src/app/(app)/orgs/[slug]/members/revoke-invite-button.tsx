import { Button } from '@/components/ui/button'
import { XOctagon } from 'lucide-react'
import React from 'react'
import { revokeInviteAction } from './action'

interface RevokeInviteButtonProps {
  inviteId: string
}

export const RevokeInviteButton = async ({inviteId}: RevokeInviteButtonProps) => {
  return (
    <form action={revokeInviteAction.bind(null, inviteId)}>
      <Button size={'sm'} variant={'destructive'}>
        <XOctagon className='size-4 mr-2' />
        Revoke
      </Button>
    </form>
  )
}
