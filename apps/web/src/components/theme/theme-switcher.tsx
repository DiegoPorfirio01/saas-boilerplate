'use client'

import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { ComputerIcon, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '../ui/button'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme()
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} size={'icon'}>
            {resolvedTheme === 'light' ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="mr-1 size-4" />
            )}
            <span className="sr-only"> Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              setTheme('light')
            }}
          >
            <Sun className="mr-1 size-4" />
            Light
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setTheme('dark')
            }}
          >
            <Moon className="mr-1 size-4" />
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setTheme('system')
            }}
          >
            <ComputerIcon className="mr-1 size-4" />
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
