import { roleSchema } from '@saas/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function getMembers(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      'organizations/:orgSlug/members',
      {
        schema: {
          tags: ['members'],
          summary: 'Get members of organization',
          security: [{ bearerAuth: [] }],
          params: z.object({
            orgSlug: z.string(),
          }),
          response: {
            200: z.object({
              members: z.array(
                z.object({
                  id: z.string().uuid(),
                  role: roleSchema,
                  userId: z.string().uuid(),
                  name: z.string().nullable(),
                  avatarUrl: z.string().nullable(),
                }),
              ),
            }),
          },
        },
      },
      async (request) => {
        const { orgSlug } = request.params

        const userId = await request.getCurrentUserId()

        const { membership, organization } =
          await request.getUserMembership(orgSlug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('get', 'User')) {
          throw new UnauthorizedError(
            `You're not allowed to see organization members `,
          )
        }

        const members = await prisma.member
          .findMany({
            select: {
              id: true,
              role: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  avatarUrl: true,
                },
              },
            },
            where: {
              organizationId: organization.id,
            },
            orderBy: {
              role: 'asc',
            },
          })
          .then((members) =>
            members.map(({ user: { id: userId, ...user }, ...members }) => {
              return {
                ...members,
                ...user,
                userId,
              }
            }),
          )

        return { members }
      },
    )
}
