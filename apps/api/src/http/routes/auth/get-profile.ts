import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function getProfile(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/profile', {
    schema: {
      tags: ['auth'],
      summary: 'get authenticated user profile',
      response: {
        200: z.object({
          user: z.object({
            id: z.string(),
            name: z.string().nullable(),
            email: z.string(),
            avatarUrl: z.string().nullable(),
          }),
        }),
        404: z.object({
          message: z.string(),
        }),
      },
    },
    async handler(request, reply) {
      const { sub } = await request.jwtVerify<{ sub: string }>()

      const user = await prisma.user.findUnique({
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
        },
        where: {
          id: sub,
        },
      })

      if (!user) {
        return reply.status(404).send({
          message: 'User not found',
        })
      }

      return reply.status(200).send({
        user,
      })
    },
  })
}
