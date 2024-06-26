import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { BadRequestError } from '../_errors/bad-request-error'
import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function deleteMember(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/organizations/:orgSlug/members/:memberId',
      {
        schema: {
          tags: ['members'],
          summary: 'Get members of organization',
          security: [{ bearerAuth: [] }],
          params: z.object({
            orgSlug: z.string(),
            memberId: z.string(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { orgSlug, memberId } = request.params

        const userId = await request.getCurrentUserId()

        const { membership, organization } =
          await request.getUserMembership(orgSlug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('delete', 'User')) {
          throw new UnauthorizedError(
            `You're not allowed to delete this organization members `,
          )
        }

        const member = await prisma.member.findFirst({
          where: {
            id: memberId,
            organizationId: organization.id,
          },
        })

        if (!member) {
          throw new BadRequestError(
            'This member, does not belong to your organization or does not exist',
          )
        }

        await prisma.member.delete({
          where: {
            id: memberId,
          },
        })

        return reply.status(204).send()
      },
    )
}
