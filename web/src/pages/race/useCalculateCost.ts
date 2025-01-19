import {useState, useEffect} from 'react';
import z from 'zod'
import {StatSchema, Stat as StatName} from "d100-libs";
import {Race} from '../../state/race/slice'
import {getTypedProperty} from '../../common/utils'

type Stat = z.infer<typeof StatSchema>

export type CostItem = {
    total: number,
    breakdown?: {
        [key: string]: number,
    }
}

export type Itemization = {
    stats: CostItem,
    move: number,
    languages: number,
    advantages: CostItem,
}

export const useCalculateCost = (mergedData: any): {cost: number, itemizedCost: Itemization} => {
    const [itemizedCost, setItemizedCost] = useState<Itemization>({
        stats: {
            total: 0,
        },
        move: 0,
        languages: 0,
        advantages: {
            total: 0
        }
    });
    const [cost, setCost] = useState(0);

    const calculateAndItemizeCosts = (data: any): void => {
        if (!data) {
            return;
        }
        let runningTotal = 0;
        let itemized = {...itemizedCost};
        const {advantageIds, languageIds, move, stats} = data;

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
            let diff = 0;
            itemized.stats = stats ? Object.keys(stats).reduce((pre: any, cur: string) => {
                const item: Stat = getTypedProperty(stats, cur as NonNullable<StatName>);
                if (item.max !== 20) {
                    diff = (item.max - 20) * 3;
                    pre.total += diff;
                    pre.breakdown[cur] = diff;
                }

                runningTotal += diff;

                return pre;
            }, { total: 0, breakdown: {} }) : { total: 0 }
        }


        setItemizedCost(itemized);
        setCost(runningTotal);
    }

    useEffect(() => {
        if (!mergedData)
            return;

        calculateAndItemizeCosts(mergedData);
    }, [mergedData])

    return {itemizedCost, cost};
}
