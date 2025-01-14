import z from 'zod'
import {CreateRaceSchema} from 'd100-libs'

export type Race = z.infer<typeof CreateRaceSchema>
