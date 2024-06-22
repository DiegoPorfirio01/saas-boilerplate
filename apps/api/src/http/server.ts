import { fastifyCors } from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { env } from '@saas/env'
import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { errorHandler } from './error-handler'
import { authenticateWithGithub } from './routes/auth/authenticate-with-github'
import { authenticateWithPassword } from './routes/auth/authenticate-with-password'
import { createAccount } from './routes/auth/create-account'
import { getProfile } from './routes/auth/get-profile'
import { requestPasswordRecover } from './routes/auth/request-password-recover'
import { resetPassword } from './routes/auth/reset-password'
import { createInvite } from './routes/invites/create-invite'
import { getInvite } from './routes/invites/get-invite'
import { getInvites } from './routes/invites/get-invites'
import { deleteMember } from './routes/members/delete-members'
import { getMembers } from './routes/members/get-members'
import { updateMember } from './routes/members/update-members'
import { createOrganization } from './routes/orgs/create-organization'
import { deleteOrganization } from './routes/orgs/delete-organization'
import { getMembership } from './routes/orgs/get-membership'
import { getOrganization } from './routes/orgs/get-organization'
import { getOrganizations } from './routes/orgs/get-organizations'
import { transferOwnerOrganization } from './routes/orgs/transfer-organization'
import { updateOrganization } from './routes/orgs/update-organization'
import { createProject } from './routes/projects/create-project'
import { deleteProject } from './routes/projects/delete-project'
import { getProject } from './routes/projects/get-project'
import { getProjects } from './routes/projects/get-projects'
import { updateProject } from './routes/projects/update-project'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors)

// documentation
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Next SaaS RBAC"',
      description: 'Full stack Next.js SaaS starter with RBAC',
      version: '0.1.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

// handler
app.setErrorHandler(errorHandler)

// ### routes ###

// auth
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})
app.register(createAccount)
app.register(getProfile)
app.register(getMembership)

app.register(authenticateWithGithub)
app.register(authenticateWithPassword)

app.register(requestPasswordRecover)
app.register(resetPassword)

app.register(getOrganizations)
app.register(getOrganization)
app.register(createOrganization)
app.register(updateOrganization)
app.register(deleteOrganization)
app.register(transferOwnerOrganization)

app.register(createProject)
app.register(deleteProject)
app.register(getProject)
app.register(getProjects)
app.register(updateProject)

app.register(getMembers)
app.register(updateMember)
app.register(deleteMember)

app.register(createInvite)
app.register(getInvite)
app.register(getInvites)

app.listen({ port: env.SERVER_PORT }).then(() => {
  console.log('Server is running on port 3333')
})
