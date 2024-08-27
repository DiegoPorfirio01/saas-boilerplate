import { ability, getCurrentOrg } from "@/auth/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { OrganizationForm } from "../organization-form"
import ShutDownOrganizationButton from "./shutdown-organization-button"
import { getOrganization } from "@/http/get-organization"

export default async function Settings() {
    const currentOrg = getCurrentOrg()

    const permissions = await ability()

    const canUpdateOrganizations = permissions?.can('update', 'Organization')
    const canGetBilling = permissions?.can('get', 'Billing')
    const canShutdownOrganization = permissions?.can('delete', 'Organization')

    const { organization } = await getOrganization(currentOrg!)

    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Settings</h1>
        <div className="space-y-4">
          {
            canUpdateOrganizations && (
              <Card>
                  <CardHeader>
                    <CardTitle></CardTitle>
                    <CardDescription></CardDescription>
                  </CardHeader>
                  <CardContent>
                    <OrganizationForm isUpdating initialData={{
                      name: organization.name,
                      domain: organization.domain,
                      shouldAttachUsersByDomain: organization.shouldAttachUsersByDomain
                    }}/>
                  </CardContent>
              </Card>
            ) 
          }
        </div>

        {
          canGetBilling && (
            <div>Billing</div>
          )
        }

        {
          canShutdownOrganization && (
            <Card>
                <CardHeader>
                  <CardTitle>Shutdown organization</CardTitle>
                  <CardDescription>This will delete all organization data including all projects. You cannot undo this action</CardDescription>
                </CardHeader>
                <CardContent>
                  <ShutDownOrganizationButton />
                </CardContent>
            </Card>
            )
        }
      </div>
    )
  }
  