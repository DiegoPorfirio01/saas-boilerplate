import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function requestPasswordRecover(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/request-password-recover', {
    schema: {
      tags: ['auth'],
      summary: 'Request password recover',
      body: z.object({
        email: z.string().email(),
      }),
      response: {
        201: z.null(),
      },
    },
    async handler(request, reply) {
      const { email } = request.body

      const userFromEmail = await prisma.user.findFirst({
        where: {
          email,
        },
      })

      // we don't want people to know if user really exists
      if (!userFromEmail) {
        return reply.status(201).send()
      }

      const { id: code } = await prisma.token.create({
        data: {
          type: 'PASSWORD_RECOVER',
          userId: userFromEmail.id,
        },
      })

      console.log('Token Recovery: ', code)

      return reply.status(201).send()
    },
  })
}
