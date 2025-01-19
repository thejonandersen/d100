import {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from '../state/hooks'
import useCalculateCost from './useCalculateCost'
import {mergedFormsData, status, submitForm} from '../state/form/slice'
import z from 'zod'
import _ from 'lodash'

export const useCreateOrEdit = (id: string | undefined, schema: z.ZodTypeAny, slice: any,  url: string, submitCost: boolean = false) => {
    const [shouldRender, setShouldRender] = useState(false);
    const [isValid, setIsValid] = useState<boolean>(false);
    const [canSubmit, setCanSubmit] = useState<boolean>(false);
    const [data, setData] = useState<any>({})
    const {byId, load} = slice;
    const initialData = useAppSelector(state => byId(state, id));
    const formStatus = useAppSelector(status);
    const merged = useAppSelector(mergedFormsData);
    const dispatch = useAppDispatch();
    const {cost, itemizedCost} = useCalculateCost(data);

    const submit = () => {
        if (submitCost) {
            data.cost = cost;
        }
        dispatch(submitForm({url, id, data}))
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
        }
    }, [id, initialData]);

    useEffect(() => {
        if (!merged) {
            return
        }

        if (_.isEqual(data, merged)) {
            return;
        }

        console.log(schema.safeParse(merged), merged)

        setIsValid(schema.safeParse(merged).success);
        setData(merged);

        console.log(merged)
    }, [merged])

    useEffect(() => {
        setCanSubmit(isValid && formStatus === 'dirty')
    }, [isValid, formStatus]);


    return {initialData, shouldRender, cost, itemizedCost, canSubmit, submit};
}
