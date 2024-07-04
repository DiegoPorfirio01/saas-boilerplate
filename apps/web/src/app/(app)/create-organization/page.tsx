import { Header } from '@/components/header'

import { CreateOrganizationForm } from './create-organization-form'

export default function CreateOrganization() {
  return (
    <div className="space-y-4 py-4">
      <Header />
      <h1 className="text-2xl font-bold">Create organization</h1>
      <CreateOrganizationForm />
    </div>
  )
}
