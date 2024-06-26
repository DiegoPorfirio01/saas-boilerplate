import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SignInPage() {
  return (
    <form action="" className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input name="email" type="email" id="email" />
      </div>
      <Button className="w-full">Recover password</Button>

      <Button className="w-full" size={'sm'} variant={'link'} asChild>
        <Link href={'/auth/sign-in'}>Sign in instead</Link>
      </Button>
    </form>
  )
}
