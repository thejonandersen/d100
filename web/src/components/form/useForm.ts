import { useCallback, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import {mergedFormsData, registerForm, status, submitForm} from '../../state/form/slice';
import useFormConditions from './useFormConditions'
import z from 'zod'
import {isEqual} from '../../common/utils'

type FormProps = {
    id: string;
    submitData?: {
        keys: string[];
        url: string;
        id?: string;
        onComplete?: (success: boolean, data?: any) => void;
    }
    submit?: (data: any) => void;
    initialData: any;
    schema: z.ZodTypeAny;
}

type SubmitHandler = (() => void) | null

const useForm = ({id, submitData, submit, initialData, schema}: FormProps) => {
    const [registered, setRegistered] = useState<boolean>(false)
    const [isValid, setIsValid] = useState<boolean>(false);
    const formStatus = useAppSelector(status);
    const mergedData = useAppSelector(mergedFormsData);
    const [cachedData, setCachedData] = useState<any>(mergedData);
    const [submitClickHandler, setSubmitClickHandler] = useState<SubmitHandler>(null);
    const {registerConditions, conditions} = useFormConditions(id);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!submit && !submitData || submitClickHandler)
            return;

        const handler = () => () => {
            console.log('setSubmitClickHandler', mergedData)
            if (submit) {
                submit(mergedData);
            } else if (submitData) {
                dispatch(submitForm({...submitData}))
            }
        }

        setSubmitClickHandler(handler);
    }, [submit, submitData]);

    useEffect(() => {
        console.log({mergedData})
        if (isEqual(mergedData, cachedData))
            return;

        setCachedData(mergedData);
    }, [mergedData]);



    useEffect(() => {
        if (isEqual({}, mergedData))
            return;

        setIsValid(schema.safeParse(mergedData).success);
    }, [mergedData]);

    useEffect(() => {
        dispatch(registerForm({id, data: initialData || {}}))
        setRegistered(true);
    }, []);


    return {registered, isValid, registerConditions, formStatus, submitClickHandler, conditions};
}

export default useForm;
