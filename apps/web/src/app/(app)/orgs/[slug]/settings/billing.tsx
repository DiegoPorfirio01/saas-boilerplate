import React from 'react'

import { getCurrentOrg } from '@/auth/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getBilling } from '@/http/get-billing'

const Billing = async () => {
  const currentOrg = getCurrentOrg()

  const { billing } = await getBilling(currentOrg!)

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Billing</CardTitle>
          <CardDescription>
            Information about your organization costs
          </CardDescription>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cost type</TableHead>
                  <TableHead className="text-right" style={{ width: 120 }}>
                    Quantity
                  </TableHead>
                  <TableHead className="text-right" style={{ width: 200 }}>
                    Subtotal
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Amount of projects</TableCell>
                  <TableCell className="text-right">
                    {billing.projects.amount}
                  </TableCell>
                  <TableCell className="text-right">
                    {billing.projects.price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}{' '}
                    ({billing.projects.unit} each)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Amount of seats</TableCell>
                  <TableCell className="text-right">
                    {billing.seats.amount}
                  </TableCell>
                  <TableCell className="text-right">
                    {billing.seats.price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}{' '}
                    ({billing.seats.unit} each)
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell />
                  <TableCell className="text-right">Total</TableCell>
                  <TableCell className="text-right">
                    {billing.total.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
          <CardFooter></CardFooter>
        </CardHeader>
      </Card>
    </>
  )
}

export default Billing
