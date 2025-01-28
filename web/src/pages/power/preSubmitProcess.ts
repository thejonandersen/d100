import {CreatePowerSchema} from 'd100-libs'
import z from 'zod'

type Power = z.infer<typeof CreatePowerSchema>


const preSubmitProcess = (data: Power, cost: number): Power => ({
    ...data,
    ppCost: cost,
    cpCost: cost,
})

export default preSubmitProcess;
