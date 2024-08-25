import { Header } from '@/components/header'
import { OrganizationForm } from '../orgs/[slug]/organization-form'


export default function CreateOrganization() {
  return (
    <div className="space-y-4 py-4">
      <h1 className="text-2xl font-bold">Create organization</h1>
      <OrganizationForm />
    </div>
  )
}
