import {CreatePowerSchema, PowerEffectSchema} from 'd100-libs'
import z from 'zod'
import {getRequirement} from './utils'

type Power = z.infer<typeof CreatePowerSchema>
type PowerEffect = z.infer<typeof PowerEffectSchema>


const preSubmitProcess = (data: Power, cost: number): Power => ({
    ...data,
    ppCost: cost,
    cpCost: cost,
    requiredSkillScore: getRequirement(cost),
    effects: data.effects.map(effect => {
        return {
            ...effect,
            damageType: effect.damageType?.length ? effect.damageType.join('') : null,
        } as PowerEffect
    })
})

export default preSubmitProcess;
