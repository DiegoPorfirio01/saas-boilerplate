import type { FastifyInstance } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'

import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../routes/_errors/bad-request-error'
import { UnauthorizedError } from '../routes/_errors/unauthorized-error'

export const auth = fastifyPlugin(async function auth(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    request.getCurrentUserId = async () => {
      try {
        const { sub } = await request.jwtVerify<{ sub: string }>()

        return sub
      } catch (error) {
        throw new UnauthorizedError('Invalid auth token')
      }
    }

    request.getUserMembership = async (slug: string) => {
      const userId = await request.getCurrentUserId()

      const member = await prisma.member.findFirst({
        where: {
          userId,
          organization: {
            slug,
          },
        },
        include: {
          organization: true,
        },
      })

      if (!member) {
        throw new UnauthorizedError(`You're not a member of this organization`)
      }

      const { organization, ...membership } = member

      return {
        organization,
        membership,
      }
    }

    request.getOrganizationBySlug = async (slug: string) => {
      const organization = await prisma.organization.findUnique({
        where: {
          slug,
        },
      })

      if (!organization) {
        throw new BadRequestError(
          `This slug does not belong to any organization`,
        )
      }

      return { organization }
    }
  })
})
