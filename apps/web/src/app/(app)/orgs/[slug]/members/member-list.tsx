import { ability, getCurrentOrg } from '@/auth/auth'
import { Button } from '@/components/ui/button'
import { TableBody, TableCell, TableRow, Table } from '@/components/ui/table'
import { getMembers } from '@/http/get-members'
import { getMembership } from '@/http/get-membership'
import { getOrganization } from '@/http/get-organization'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import { organizationSchema } from '@saas/auth'
import { ArrowLeftRight, Crown, CrownIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export async function MemberList() {
  const currentOrg = getCurrentOrg()
  const permissions = await ability()

  const [{members}, {membership}, {organization}] = await Promise.all([
    getMembers(currentOrg!),
    getMembership(currentOrg!),
    getOrganization(currentOrg!)
  ]);

  const authOrganization = organizationSchema.parse(organization)

  return (
    <div className='space-y-4'>
      <div className='rounded border'>
        <Table>
          <TableBody>
            {
              members.map(member => {
                return (
                  <TableRow key={member.id}>
                    <TableCell className='py-2.5' style={{width: 48}}> 
                      <Avatar>
                        <AvatarFallback />
                        {
                          member.avatarUrl && (
                            <Image alt='avatar member' src={member.avatarUrl} width={32} height={32}  className='aspect-square size-full'/>
                          ) 
                        }
                      </Avatar>  
                    </TableCell>  
                    <TableCell className='py-2.5'> 
                      <div className='flex flex-col'>
                        <span className='font-medium inline-flex items-center gap-2'>
                          {member.name}
                          {member.userId === membership.userId && ' (me)' }
                          {organization.ownerId === member.userId && 
                            <span className='inline-flex items-center gap-1 text-xs text-muted-foreground'>
                              <Crown size={16}/>
                              Owner
                            </span> 
                          }
                        </span>
                        <span className='text-xs text-muted-foreground'> {member.email} </span>
                      </div>
                    </TableCell>
                    <TableCell className='py-2.5 flex items-center justify-end gap-2'>
                        {
                          permissions?.can('transfer_ownership', authOrganization) && (
                            <Button size={'sm'} variant={'ghost'}>
                              <ArrowLeftRight size={14} className='mr-2'/>
                              Trasnsfer ownership
                            </Button>
                          )
                        }
                    </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </div>
    </div>
  )
}