'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import githubIcon from '@/assets/github-icon.svg'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useFormState } from '@/hooks/useFormState'

import { signInWithGithub } from '../actions'
import { signUpAction } from './actions'

export function SignUpForm() {
  const router = useRouter()

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    signUpAction,
    () => {
      router.push('/auth/sign-in')
    },
  )
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {success === false && message && (
          <Alert variant={'destructive'}>
            <AlertTriangle className="size-4" />
            <AlertTitle>Sign in failed !</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input name="name" type="name" id="name" />
        </div>
        {errors?.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.name[0]}
          </p>
        )}

        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input name="email" type="email" id="email" />
        </div>
        {errors?.email && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.email[0]}
          </p>
        )}

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" id="password" />
        </div>
        {errors?.password && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.password[0]}
          </p>
        )}
        <div className="space-y-1">
          <Label htmlFor="password_confirmation">Confirm your password</Label>
          <Input
            name="password_confirmation"
            type="password"
            id="password_confirmation"
          />
        </div>
        {errors?.password_confirmation && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.password_confirmation[0]}
          </p>
        )}

        <Button disabled={isPending} className="w-full">
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Create account'
          )}
        </Button>

        <Button className="w-full" size={'sm'} variant={'link'} asChild>
          <Link href={'/auth/sign-in'}>Already registered ? Sign In</Link>
        </Button>

        <Separator />
      </form>

      <form action={signInWithGithub}>
        <Button type="submit" className="w-full" variant={'outline'}>
          <Image src={githubIcon} className="mr-2 dark:invert" alt="" />
          Sign in with GitHub
        </Button>
      </form>
    </>
  )
}
