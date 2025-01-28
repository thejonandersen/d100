import {useState, useEffect} from 'react';
import {byIds} from '../state/advantage/slice'
import {useAppSelector} from '../state/hooks'
import {isEqual} from '../common/utils'

export type CostItem = {
    total: number;
    breakdown?: {
        [key: string]: number;
    }
}

export type Itemization = {
    [key: string]: CostItem | number;
}

export type Costs = {
    cost: number;
    itemizedCost: Itemization;
}

export type CalculatorResult = {
    calculatedCost: number;
    calculatedItemization: Itemization;
}

export type CostCalculator = (data: any) => CalculatorResult

const useCalculateCost = (mergedData: any, calculator?: CostCalculator): Costs => {
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
    const [data, setData] = useState<any>();
    const [advantageIds, setAdvantageIds] = useState<string[]>();
    const advantages = useAppSelector(state => byIds(state, advantageIds))

    useEffect(() => {
        console.log({data})
        if (!data || !calculator) {
            return;
        }
        const {calculatedCost, calculatedItemization} = calculator({data, advantages});

        if (!isEqual(calculatedItemization, itemizedCost)) {
            setItemizedCost(calculatedItemization);
        }

        if (cost !== calculatedCost) {
            setCost(calculatedCost);
        }
    }, [data, advantages]);

    useEffect(() => {
        if (!mergedData || isEqual(mergedData, data))
            return;

        setData(mergedData);
        setAdvantageIds(mergedData.advantageIds)
    }, [mergedData])

    return {itemizedCost, cost};
}

export default useCalculateCost;
