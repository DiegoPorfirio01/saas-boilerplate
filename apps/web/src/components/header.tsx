import { Slash } from 'lucide-react'
import Image from 'next/image'

import githubIcon from '@/assets/github-icon.svg'
import { ability } from '@/auth/auth'

import { OrganizationSwitcher } from './organization-switcher'
import { ProfileButton } from './profile-button'
import { ProjectSwitcher } from './project-switcher'
import { ThemeSwitcher } from './theme/theme-switcher'
import { Separator } from './ui/separator'

export async function Header() {
  const permissions = await ability()

  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between">
      <div className="flex items-center gap-3">
        <Image src={githubIcon} className="size-6 dark:invert" alt="" />
        <Slash className="size-3 -rotate-[24deg] text-border" />
        <OrganizationSwitcher />
        {permissions?.can('get', 'Project') && (
          <>
            <Slash className="size-3 -rotate-[24deg] text-border" />
            <ProjectSwitcher />
          </>
        )}
      </div>
      <div className="flex items-center gap-3">
        <ThemeSwitcher />
        <Separator orientation="vertical" />
        <ProfileButton />
      </div>
    </div>
  )
}
