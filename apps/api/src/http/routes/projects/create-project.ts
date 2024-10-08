import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { generateSlug } from '@/utils/create-slug'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { UnauthorizedError } from '../_errors/unauthorized-error'
import { UniqueConstraintError } from '../_errors/uniqueConstraintError'

export async function createProject(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organizations/:slug/projects',
      {
        schema: {
          tags: ['projects'],
          summary: 'Create a new project',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
            description: z.string(),
          }),
          params: z.object({
            slug: z.string(),
          }),
          response: {
            201: z.object({
              projectId: z.string().uuid(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const userId = await request.getCurrentUserId()

        const { organization, membership } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('create', 'Project')) {
          throw new UnauthorizedError(
            `you're not allowed to create new projects`,
          )
        }

        const { name, description } = request.body

        const hasAnotherSomeSlug = await prisma.project.findFirst({
          where: {
            organizationId: organization.id,
            slug: generateSlug(name),
          },
        })

        if (hasAnotherSomeSlug) {
          throw new UniqueConstraintError(
            'A project with this slug already exists in the organization.',
          )
        }

        const project = await prisma.project.create({
          data: {
            name,
            slug: generateSlug(name),
            description,
            organizationId: organization.id,
            ownerId: userId,
          },
        })

        return reply.status(201).send({
          projectId: project.id,
        })
      },
    )
}
