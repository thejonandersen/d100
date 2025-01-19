import {getValue, updateFormData } from '../../../state/form/slice'
import {useAppSelector, useAppDispatch} from '../../../state/hooks'

type useTemplateDataParams = {
    formId: string;
    name: string | undefined;
}

type useTemplateDataReturn = {
    displayName: string;
    handleChange: (e: any) => void;
    defaultValue: any;
}

const useTemplateData = ({formId, name}: useTemplateDataParams): useTemplateDataReturn => {
    const path = `${formId}.${name}`;
    const defaultValue = useAppSelector((state) => getValue(state, path));
    const dispatch = useAppDispatch();
    const displayName: string = name ? name.split(".").pop() as string : "";
    const handleChange = (e: any) => {
        if (e.target?.value) {
            console.log(e.target.value)
            dispatch(updateFormData({ id: formId, path, data: e.target.value }));
        } if (e.newData) {
            dispatch(updateFormData({ id: formId, path, data: JSON.stringify(e.newData) }));
        }
    }

    return {displayName, handleChange, defaultValue}
}

export default useTemplateData;
