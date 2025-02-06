import {useCallback, useEffect, useState} from "react";
import {useAppSelector} from '../../state/hooks'
import {get, isEqual} from 'lodash'
import {v4 as uuid} from 'uuid'

type Option = {
    [key: string]: string[]
}

export type RegisterConditionParams = {
    key: string;
    scope: string;
    parent?: string;
    options?: Option[];
    equals?: string | number | boolean;
    not?: string | number | boolean;
    id: string;
}

export type Condition = {
    path: string;
    conditionMet?: boolean;
    optionsMet?: string[] | null;
    options?: Option[];
    equals?: string | number | boolean | string[];
    not?: string | number | boolean;
}

export type Conditions = {
    [key: string]: Condition;
}

const useFormConditions = (formId: string) => {
    const [id] = useState<string>(formId);
    const [ids, setIds] = useState<string[]>([]);
    const [conditions, setConditions] = useState<Conditions>({});
    const formData = useAppSelector(state => state.form.forms[id]);

    const registerConditions = (conditionParams: RegisterConditionParams[]) => {
        let newConditions: Conditions = {}
        let newIds: string[] = [];
        let componentIds: string[] = [];
        conditionParams.forEach(condition => {
            const {key, scope, parent, options, equals, not, id} = condition;
            componentIds.push(id);
            if (!ids.includes(id)) {
                newIds.push(id);
            }
            newConditions[id] = {
                path: scope === 'parent' ? `${parent}.${key}` : key as string,
                options,
                equals,
                not,
                conditionMet: false,
                optionsMet: null,
            }
        })

        if (newIds.length) {
            setIds(prevState => [...prevState, ...newIds]);
            setConditions(prevState => ({...prevState, ...newConditions}));
        }

        return componentIds;
    };

    useEffect(() => {
        if (!Object.keys(conditions).length || !formData) return;

        const newConditions = Object.keys(conditions).reduce((pre, id) => {
            const condition = conditions[id];
            const {path, options, equals, not} = condition;
            const value: string | number | boolean = get(formData, path);
            let conditionMet = false;
            let optionsMet = null;
            if (equals) {
                if (Array.isArray(equals)) {
                    conditionMet = equals.includes(value as string);
                } else {
                    conditionMet = value === equals;
                }
            } else if (not) {
                conditionMet = value !== not;
            }

            if (options) {
                optionsMet = get(options, value as string);
            }

            return {
                ...pre,
                [id]:{
                    ...condition,
                    conditionMet,
                    optionsMet,
                }
            }
        }, {})

        if (!isEqual(newConditions, conditions))
            setConditions(newConditions);

    }, [conditions, formData]);

    return {registerConditions, conditions}
}

export default useFormConditions;
