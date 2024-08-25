import { getCurrentOrg } from '@/auth/auth'
import { Button } from '@/components/ui/button'
import { shutdown } from '@/http/shutdown-organization'
import { XCircle } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

const ShutDownOrganizationButton = () => {
  async function shutdownOrganization() {
    'use server'

    const currentOrg = await getCurrentOrg()
    
    await shutdown({org: currentOrg!})

    redirect('/')
  }

  return (
    <form action={shutdownOrganization}>
        <Button type='submit' variant='destructive' className="w-56">
            <XCircle className='size-4 mr-2'/>
            Shutdown Organization
        </Button>
    </form>
  )
}

export default ShutDownOrganizationButton