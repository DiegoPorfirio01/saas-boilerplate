'use client'

import { AlertTriangle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/useFormState'

import { createProjectAction } from './actions'
import { Textarea } from '@/components/ui/textarea'
import { queryClient } from '@/lib/react-query'


export function CreateProjectForm() {
  const { slug: org } = useParams<{ slug: string }>()

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    createProjectAction,
    () => {
      queryClient.invalidateQueries({
        queryKey: [org, 'projects']
      })
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
              <p>Project created with success</p>
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
        )}

        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input name="name" id="name" />

          {errors?.name && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.name[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="name">Description</Label>
          <Textarea name="description" id="description" />

          {errors?.description && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.description[0]}
            </p>
          )}
        </div>

        <Button className="w-full" type="submit" disabled={isPending}>
          Save project
        </Button>
      </form>
    </>
  )
}
