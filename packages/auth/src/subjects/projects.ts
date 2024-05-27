import { z } from 'zod'

import { projectSchema } from '../models/project'

export const projectSubject = z.tuple([
  z.union([
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
    z.literal('manage'),
  ]),
  z.union([z.literal('Project'), projectSchema]),
])

export type ProjectSubject = z.infer<typeof projectSubject>
