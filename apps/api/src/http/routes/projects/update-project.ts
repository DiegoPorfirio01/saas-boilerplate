import { projectSchema } from '@saas/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { BadRequestError } from '../_errors/bad-request-error'
import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function updateProject(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/organizations/:orgSlug/projects/:projectSlug',
      {
        schema: {
          tags: ['project'],
          summary: 'update project details',
          security: [{ bearerAuth: [] }],
          params: z.object({
            orgSlug: z.string(),
            projectSlug: z.string(),
          }),
          body: z.object({
            name: z.string(),
            description: z.string(),
          }),
          response: {
            200: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { orgSlug, projectSlug } = request.params

        const userId = await request.getCurrentUserId()

        const { membership, organization } =
          await request.getUserMembership(orgSlug)

        const project = await prisma.project.findFirst({
          where: {
            organizationId: organization.id,
            slug: projectSlug,
          },
        })

        if (!project) {
          throw new BadRequestError(
            'Does not exist this project in this organization',
          )
        }

        const authProject = projectSchema.parse(project)
        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('update', authProject)) {
          throw new UnauthorizedError(
            `You're not allowed for update this Project`,
          )
        }

        const { name, description } = request.body

        await prisma.project.update({
          data: {
            name,
            description,
          },
          where: {
            slug: projectSlug,
            organizationId: organization.id,
          },
        })

        return reply.status(204).send()
      },
    )
}
