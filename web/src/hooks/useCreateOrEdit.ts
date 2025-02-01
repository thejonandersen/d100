import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from '../state/hooks'
import useCalculateCost, {CostCalculator} from './useCalculateCost'
import {mergedFormsData, status, submitForm} from '../state/form/slice'
import {allSlices, Slices} from '../state/slices'
import z from 'zod'
import {isEqual} from '../common/utils'
import {capitalize} from '@mui/material'

type CreateOrEditProps = {
    id: string | undefined;
    schema: z.ZodTypeAny;
    key: string;
    costCalculator?: CostCalculator;
    preSubmitProcess?: (data: any, cost: number) => any;
}

export const useCreateOrEdit = ({id, schema, key, costCalculator, preSubmitProcess}: CreateOrEditProps) => {
    const [shouldRender, setShouldRender] = useState(false);
    const [isValid, setIsValid] = useState<boolean>(false);
    const [canSubmit, setCanSubmit] = useState<boolean>(false);
    const [data, setData] = useState<any>({})

    const {byId, load, created, updated} = allSlices[key as keyof Slices];
    const initialData: any = useAppSelector(state => byId(state, id));
    const formStatus = useAppSelector(status);
    const merged = useAppSelector(mergedFormsData);
    const dispatch = useAppDispatch();
    const {cost, itemizedCost} = useCalculateCost(data, costCalculator);
    const [message, setMessage] = useState<string | null>(null);
    const [severity, setSeverity] = useState<'success' | 'error'>('success');

    const submit = () => {
        const payload = preSubmitProcess ? preSubmitProcess(data, cost) : data;
        const onComplete = (success: boolean, data: any) => {
            if (success) {
                setSeverity('success');
                setMessage(`${capitalize(key as string)} ${id ? 'Updated' : 'Created'}`);

                const action = id ? updated : created;
                dispatch(action(data))
            } else {
                setSeverity('error');
                setMessage(data.message);
            }

            setTimeout(() => {
                setMessage(null);
                setSeverity('success');
            }, 2000)
        };
        dispatch(submitForm({url: key, id, data: payload, onComplete}))
    }

    useEffect(() => {
        if (!id) {
            setShouldRender(true);
            return;
        }

        if (id && !initialData) {
            dispatch(load())
        }

        if (initialData) {
            setShouldRender(true)
            setData(initialData)
        }
    }, [id, initialData]);

    useEffect(() => {
        if (!merged) {
            return
        }

        if (isEqual(data, merged)) {
            return;
        }

        setData(merged);
        setIsValid(schema.safeParse(merged).success);
    }, [merged])

    useEffect(() => {
        setCanSubmit(isValid && formStatus === 'dirty')
    }, [isValid, formStatus]);


    return {initialData, shouldRender, cost, itemizedCost, canSubmit, submit, message, severity};
}
