import React, {useEffect, useState} from "react";
import {RenderTemplate} from "./RenderTemplate";
import {ConditionalTemplateProps} from "./types";
import {getValue, updateFormData} from '../../../state/form/slice'
import {useAppDispatch, useAppSelector} from '../../../state/hooks'
import {isEqual, get, cloneDeep} from 'lodash';

type Condition = {
    key: string;
    equals?: any | any[];
    not?: any | any[];
    scope?: string;
}

export const ConditionalTemplate: React.FC<ConditionalTemplateProps> = ({
    schema, name, props, sx, gridSize, formId, shouldLabelObjects
}) => {
    const conditions: Condition[] = props.conditions;
    const [conditionMet, setConditionMet] = useState<boolean>(false);
    const [rendered, setRendered] = useState<boolean>(false);
    const [cached, setCached] = useState<any>();
    const path = `${formId}.${name}`;
    const parent = `${formId}.${name?.split('.').slice(0,1)}`
    const value = useAppSelector((state) => getValue(state, path));
    const formData: any = useAppSelector((state) =>
        conditions?.length === 1 && conditions[0]?.scope === 'parent' ? getValue(state, parent) : state.form.forms[formId]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!conditions || !formData)
            return;

        if (!isEqual(cached, formData)) {
            setCached(formData);
        }

        const metAll = conditions.every(condition => {
            const {key, equals, not} = condition;
            const conditionPath = `${name?.split('.').slice(0,1)}.${key}`;
            const conditionValue = get(cached, key) || get(cached, conditionPath);

            if (equals) {
                if (Array.isArray(equals)) {
                    return equals.includes(conditionValue);
                }

                return conditionValue === equals;
            } else if (not) {
                if (Array.isArray(equals)) {
                    return !equals.includes(conditionValue);
                }

                return conditionValue !== equals;
            }

            return true;
        })


        setConditionMet(metAll);
    }, [formData, conditions, cached]);

    useEffect(() => {
        if (conditionMet && !rendered) {
            setRendered(true);
        }
    }, [conditionMet]);

    useEffect(() => {
        if (value && !conditionMet && rendered) {
            setRendered(false);
            dispatch(updateFormData({id: formId, path, data: null}));
        }
    }, [value, conditionMet]);

    const newSchema = cloneDeep(schema);
    // @ts-ignore
    newSchema._def.description = props.subTemplate ? JSON.stringify(props.subTemplate) : "{}";
    return (conditionMet ?
        <RenderTemplate
        schema={newSchema}
        name={name}
        sx={sx}
        gridSize={gridSize}
        formId={formId}
        props={props}
        shouldLabelObjects={shouldLabelObjects}
    />
        : null);
};

