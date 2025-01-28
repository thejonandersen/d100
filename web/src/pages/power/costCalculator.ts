import {Advantage} from '../../state/advantage/slice'
import {CalculatorResult, Itemization, CostItem} from '../../hooks/useCalculateCost'
import z from 'zod'
import {Power} from '../../state/power/slice'
import CostMaps from './CostMaps'
import {PowerEffectSchema} from 'd100-libs'

type Effect = z.infer<typeof PowerEffectSchema>
type CostCalculatorProps = {
    data: Power;
    advantages?: Advantage[];
    itemizedCost: Itemization;
}

export const costCalculator = ({ data, itemizedCost }: CostCalculatorProps): CalculatorResult => {
    let runningTotal = 0;
    let itemized = {...itemizedCost};
    let diff: any;
    const {skill, duration, apCost, areaOfEffect, effects, range} = data;
    const costMap = CostMaps[skill];
    if (costMap) {
        // ap cost
        if (apCost !== undefined) {
            diff = costMap.apCost[apCost]
            if (diff !== undefined) {
                runningTotal += diff;
                itemized.apCost = diff;
            }
        }

        // duration
        if (duration !== undefined) {
            diff = costMap.duration[duration]
            if (diff !== undefined) {
                runningTotal += diff;
                itemized.duration = diff;
            }
        }

        // areaOfEffect
        if (areaOfEffect !== undefined) {
            diff = costMap.areaOfEffect[areaOfEffect.type][areaOfEffect.value]
            if (diff !== undefined) {
                runningTotal += diff;
                itemized.areaOfEffect = diff;
            }
        }

        // range
        if (range !== undefined) {
            diff = costMap.range[range]
            if (diff !== undefined) {
                runningTotal += diff;
                itemized.range = diff;
            }
        }

        // effects
        if (effects !== undefined && effects.length) {
            const effectsItems: CostItem = itemized.effects ? itemized.effects as CostItem : { total: 0, breakdown: {} };
            itemized.effects = effectsItems;
            console.clear()
            effects?.forEach((effect: Effect, index) => {
                if (!effect || !effect.type)
                    return;
                let value: string = effect[effect.type as keyof typeof effect] as string
                console.log({effect, value, type: effect.type})
                if (!value)
                    return;

                const modifier: string = effect.typeModifierLevel as string;
                if (modifier) {
                    diff = costMap[effect.type][value][modifier]
                    if (effect.type === 'healing' || effect.type === 'miscellaneous') {
                        value = `${value} ${modifier}`
                    } else if (effect.type === 'damage') {
                        value = `${value} damage ${modifier}`
                    }
                } else {
                    diff = costMap[effect.type][value]
                }

                if (diff === undefined || typeof diff !== 'number')
                    return;

                runningTotal += diff;
                if (itemized.effects) {
                    effectsItems.total += diff
                    if (effectsItems.breakdown) {
                        if (effect.type === 'healing' || effect.type === 'damage') {
                            effectsItems.breakdown[value] = diff
                        } else {
                            effectsItems.breakdown[value] = diff;
                        }
                    }
                }
            })
        }

    }
    console.log({runningTotal, itemized, costMap});

    return { calculatedCost: runningTotal, calculatedItemization: itemized }
}


