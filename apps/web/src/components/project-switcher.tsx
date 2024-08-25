'use client'

import { useQuery } from '@tanstack/react-query'
import { ChevronsUpDown, Loader2, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { use } from 'react'

import { getProjects } from '@/http/get-projects'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

export function ProjectSwitcher() {
  const { slug: orgSlug, slug: projectSlug } = useParams<{
    slug: string
  }>()


  const { data, isLoading } = useQuery({
    queryKey: [orgSlug, 'projects'],
    queryFn: () => getProjects(orgSlug),
    enabled: !!orgSlug,
  })

  const currentProject = data?.projects.find((project) => project.slug === projectSlug);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-[168px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
        { isLoading ? <>
            <Skeleton className='size-4 rounded-full' />
            <Skeleton className='h-4 w-full flex-1' />
          </> : 
          currentProject ? (
          <>
            <Avatar className="mr-2 size-4">
              {currentProject.avatarUrl && (
                <AvatarImage src={currentProject.avatarUrl} />
              )}
              <AvatarFallback />
            </Avatar>
            <span className="truncate text-left">
              {currentProject.name}
            </span>
          </>
        ) :
        <span className="text-muted-foreground">Select project</span>
      }
      { isLoading ?  
          <Loader2 className='animate-spin size-4'/>
        : 
          <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
      }
      
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        sideOffset={12}
        className="w-[200px]"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Projects</DropdownMenuLabel>
          {
            data?.projects.map((project) =>  
            <DropdownMenuItem key={project.id} asChild>
              <Link href={`/orgs/${orgSlug}/${project.slug}`}>
                <Avatar className="mr-1 size-5">
                  <AvatarImage src={project.avatarUrl ?? ''} />
                  <AvatarFallback />
                </Avatar>
                <span className="line-clamp-1">{project.name}</span>
              </Link>
            </DropdownMenuItem>)
          }
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/orgs/${orgSlug}/create-project`}>
            <PlusCircle className="mr-2 size-4" />
            Create new
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
