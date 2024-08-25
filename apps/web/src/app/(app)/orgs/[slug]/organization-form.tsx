'use client'

import { AlertTriangle } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/useFormState'

import { createOrganizationAction } from '../../create-organization/actions'

export function OrganizationForm() {
  const router = useRouter()
  
  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    createOrganizationAction,
    () => {
      router.push('/auth/sign-in')
    },
  )

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {success && (
          <Alert variant="success">
            <AlertTriangle className="size-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              <p>Organization created !</p>
            </AlertDescription>
          </Alert>
        )}
        {success === false && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Failed !</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )
        }
        
        <div className="space-y-1">
          <Label htmlFor="name">Organization name</Label>
          <Input name="name" id="name" />

          {errors?.name && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.name[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="domain">E-mail domain</Label>
          <Input
            name="domain"
            type="text"
            id="domain"
            inputMode="url"
            placeholder="example.com"
          />

          {errors?.domain && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.domain[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <div className="flex items-start space-x-2">
            <div className="translate-y-0.5">
              <Checkbox
                name="shouldAttachUsersByDomain"
                id="shouldAttachUsersByDomain"
              />
            </div>
            <label htmlFor="shouldAttachUsersByDomain" className="space-y-1">
              <span className="text-sm font-medium leading-none">
                Auto-join new members
              </span>
              <p className="text-sm text-muted-foreground">
                This will automatically invite all members with same e-mail
                domain to this organization.
              </p>
            </label>
          </div>
        </div>

        <Button className="w-full" type="submit" disabled={isPending}>
          Save organization
        </Button>
      </form>
    </>
  )
}
