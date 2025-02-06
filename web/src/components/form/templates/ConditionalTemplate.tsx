import React, {useEffect, useState, useContext} from "react";
import {RenderTemplate} from "./RenderTemplate";
import {ConditionalTemplateProps} from "./types";
import {updateFormData} from '../../../state/form/slice'
import {useAppDispatch} from '../../../state/hooks'
import {cloneDeep} from 'lodash';
import {RegisterConditionParams} from '../useFormConditions'
import {FormContext} from './Form'

export const ConditionalTemplate: React.FC<ConditionalTemplateProps> = ({
    name, formId, sx, schema, props
}) => {
    const {registerConditions, conditions} = useContext(FormContext);
    const [ids, setIds] = useState<string[]>();
    const [conditionMet, setConditionMet] = useState<boolean>(false);
    const [rendered, setRendered] = useState<boolean>(false);

    const path = `${formId}.${name}`;
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (props?.conditions) {
            const parent = `${name?.split('.').slice(0,1)}`
            const fieldId = name?.replaceAll('.', '').replaceAll('[', '').replaceAll(']','') as string;
            const ids = registerConditions(props.conditions.map((condition: RegisterConditionParams, index: number) => ({
                ...condition,
                parent,
                id: fieldId + index,
            })));

            setIds(ids);
        }
    }, []);

    useEffect(() => {
        if (!conditions || !Object.keys(conditions).length)
            return;
        const allMet = ids && ids.every(id => {
            const condition = conditions[id]
            if (!condition) {
                return true;
            }
            if (!condition.equals) {
                return true;
            }

            return condition.conditionMet
        });

        setConditionMet(allMet as boolean);

        if (allMet && !rendered) {
            setRendered(true);
        }
    }, [conditions, ids]);

    useEffect(() => {
        if (!conditionMet && rendered) {
            setRendered(false);
            dispatch(updateFormData({id: formId, path, data: null}));
        }
    }, [conditionMet]);

    const newSchema = cloneDeep(schema);
    // @ts-ignore
    newSchema._def.description = props.subTemplate ? JSON.stringify(props.subTemplate) : "{}";
    return (conditionMet ?
        <RenderTemplate
        schema={newSchema}
        name={name}
        sx={sx}
        formId={formId}
        props={props}
    />
        : null);
};

