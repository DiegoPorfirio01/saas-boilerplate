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
        <Label htmlFor="name">Name</Label>
        <Input name="name" type="name" id="name" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input name="email" type="email" id="email" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input name="password" type="password" id="password" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Confirm your password</Label>
        <Input name="password" type="password" id="password" />
      </div>

      <Button className="w-full">Create account</Button>
      <Button className="w-full" size={'sm'} variant={'link'} asChild>
        <Link href={'/auth/sign-in'}>Already registered ? Sign In</Link>
      </Button>

      <Separator />

      <Button className="w-full" variant={'outline'}>
        <Image src={githubIcon} className="mr-2 dark:invert" alt="" />
        Sign up with GitHub
      </Button>
    </form>
  )
}
