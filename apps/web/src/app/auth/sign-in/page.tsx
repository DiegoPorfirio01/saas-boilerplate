import Image from 'next/image'
import Link from 'next/link'

import githubIcon from '@/assets/github-icon.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function SignInPage() {
  return (
    <form action="" className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input name="email" type="email" id="email" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input name="password" type="password" id="password" />

        <Link
          href={'/auth/forgot-password'}
          className="text-xs font-medium text-foreground hover:underline"
        >
          Forget your password ?
        </Link>
      </div>

      <Button className="w-full">Sign in with e-mail</Button>

      <Button className="w-full" size={'sm'} variant={'link'} asChild>
        <Link href={'/auth/sign-up'}>Create new account</Link>
      </Button>

      <Separator />

      <Button className="w-full" variant={'outline'}>
        <Image src={githubIcon} className="mr-2 dark:invert" alt="" />
        Sign in with GitHub
      </Button>
    </form>
  )
}
