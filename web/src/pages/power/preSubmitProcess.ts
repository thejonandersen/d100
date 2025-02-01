import {CreatePowerSchema} from 'd100-libs'
import z from 'zod'
import {getRequirement} from './utils'

type Power = z.infer<typeof CreatePowerSchema>


const preSubmitProcess = (data: Power, cost: number): Power => ({
    ...data,
    ppCost: cost,
    cpCost: cost,
    requiredSkillScore: getRequirement(cost),
})

export default preSubmitProcess;
