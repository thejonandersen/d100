import {useState, useEffect} from 'react';
import {getValue, updateFormData } from '../../../state/form/slice'
import {useAppSelector, useAppDispatch} from '../../../state/hooks'
import {boolean} from 'zod'

type useTemplateDataParams = {
    formId: string;
    name: string | undefined;
}

type useTemplateDataReturn = {
    displayName: string;
    handleChange: (e: any, _?:any, isNumber?: boolean) => void;
}

const useTemplateData = ({formId, name}: useTemplateDataParams): useTemplateDataReturn => {
    const path = `${formId}.${name}`;
    const dispatch = useAppDispatch();
    const displayName: string = name ? name.split(".").pop() as string : "";
    const handleChange = (e: any, _?: any, isNumber?: boolean) => {
        if (e.target?.value) {
            dispatch(updateFormData({ id: formId, path, data: isNumber ? Number(e.target.value): e.target.value }));
        } if (e.newData) {
            dispatch(updateFormData({ id: formId, path, data: JSON.stringify(e.newData) }));
        }
    }

    return {displayName, handleChange}
}

export default useTemplateData;
