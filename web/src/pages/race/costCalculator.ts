import {getTypedProperty} from '../../common/utils'
import {StatSchema, StatName as StatNameSchema} from 'd100-libs'
import {Advantage} from '../../state/advantage/slice'
import {CalculatorResult, Itemization} from '../../hooks/useCalculateCost'
import z from 'zod'

type Stat = z.infer<typeof StatSchema>
type StatName = z.infer<typeof StatNameSchema>
type CostCalculatorProps = {
    data: any;
    advantages: Advantage[];
    itemizedCost: Itemization;
}

export const costCalculator = ({ data, advantages, itemizedCost }: CostCalculatorProps): CalculatorResult => {
    let runningTotal = 0;
    let itemized = {...itemizedCost};
    const {advantageIds: newIds, languageIds, move, stats} = data;

    if (languageIds && languageIds.length ) {
        const diff = (languageIds.length - 1) * 3;
        itemized.languages = diff;
        runningTotal += diff;
    }

    if (move) {
        const diff = (move - 6) * 10
        itemized.move = diff;
        runningTotal += diff;
    }

    if (stats) {
        itemized.stats = stats ? Object.keys(stats).reduce((pre: any, cur: string) => {
            const item: Stat = getTypedProperty(stats, cur as NonNullable<StatName>);
            let diff = 0;
            if (item.max !== 20) {
                diff = (item.max - 20) * 3;
                pre.total += diff;
                pre.breakdown[cur] = diff;
            }

            runningTotal += diff;

            return pre;
        }, { total: 0, breakdown: {} }) : { total: 0 }
    }

    if(advantages) {
        let diff = 0;
        itemized.advantages = advantages.reduce((pre: any, cur: any) => {
            if (cur) {
                diff = cur.cost;
                runningTotal += diff;
                pre.total += diff;
                pre.breakdown[cur.name] = diff;
            }
            return pre
        }, { total: 0, breakdown: {} })
    }

    return { calculatedCost: runningTotal, calculatedItemization: itemized }
}


