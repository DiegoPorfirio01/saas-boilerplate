'use server'

import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu'
import { ChevronsUpDown, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'

import { getCurrentOrg } from '@/auth/auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getOrganization } from '@/http/get-organizations'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export async function OrganizationSwitcher() {
  const { organizations } = await getOrganization()

  const currentOrg = organizations.find(
    (organization) => organization.slug === getCurrentOrg(),
  )

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1">
          {currentOrg ? (
            <>
              <Avatar className="mr-2 size-5">
                <AvatarImage src={currentOrg.avatarUrl ?? ''} />
                <AvatarFallback />
              </Avatar>
              <span className="truncate text-left">{currentOrg.name}</span>
            </>
          ) : (
            <span className="text-muted-foreground">Select organization</span>
          )}
          <ChevronsUpDown className="size-4 text-muted-foreground" />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-44" sideOffset={12} align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Organizations</DropdownMenuLabel>
            {organizations.map((userOrganization) => {
              return (
                <DropdownMenuItem
                  className="flex w-full items-center justify-start p-1"
                  key={userOrganization.id}
                  asChild
                >
                  <Link
                    href={`/orgs/${userOrganization.slug}`}
                    className="flex items-center"
                  >
                    <Avatar className="mr-1 size-5">
                      <AvatarImage src={userOrganization.avatarUrl ?? ''} />
                      <AvatarFallback />
                    </Avatar>
                    {userOrganization.name} (
                    {userOrganization.role.toLowerCase()})
                  </Link>
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href={'/create-organization'}
              className="flex items-center py-1"
            >
              <PlusCircle className="mx-1 size-5" />
              Create new
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
