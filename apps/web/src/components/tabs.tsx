import React from 'react'

import { ability, getCurrentOrg } from '@/auth/auth'

import { NavLink } from './nav-link'
import { Button } from './ui/button'

const Tabs = async () => {
  const currentOrg = getCurrentOrg()
  const permissions = await ability()

  const canUpdateOrganizations = permissions?.can('update', 'Organization')
  const canGetBilling = permissions?.can('get', 'Billing')
  const canGetMembers = permissions?.can('get', 'User')
  const canGetProject = permissions?.can('get', 'Project')

  return (
    <div className="border-b py-4">
      <nav className="mx-auto flex max-w-[1200px] items-center gap-2">
        {canGetProject && (
          <Button
            asChild
            variant={'ghost'}
            size={'sm'}
            className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
          >
            <NavLink href={`/orgs/${currentOrg}`}>Projects</NavLink>
          </Button>
        )}
        {canGetMembers && (
          <Button
            asChild
            variant={'ghost'}
            size={'sm'}
            className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
          >
            <NavLink href={`/orgs/${currentOrg}/members`}>Members</NavLink>
          </Button>
        )}
        {(canUpdateOrganizations || canGetBilling) && (
          <Button
            asChild
            variant={'ghost'}
            size={'sm'}
            className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
          >
            <NavLink href={`/orgs/${currentOrg}/settings`}>
              Settings & Billing
            </NavLink>
          </Button>
        )}
      </nav>
    </div>
  )
}

export default Tabs
