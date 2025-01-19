import React, {useEffect, useState} from "react";
import _ from "lodash";
import {RenderTemplate} from "./RenderTemplate";
import {ConditionalTemplateProps} from "./types";
import {getValue, updateFormData} from '../../../state/form/slice'
import {useAppDispatch, useAppSelector} from '../../../state/hooks'


type Condition = {
    key: string; value: any;
}

export const ConditionalTemplate: React.FC<ConditionalTemplateProps> = ({
    schema, name, props, sx, gridSize, formId, shouldLabelObjects
}) => {
    const displayName: string = name ? name.replace("Id", "").split(".").pop() as string : "";
    const condition: Condition = props.condition;
    const [conditionMet, setConditionMet] = useState<boolean>(false);
    const [rendered, setRendered] = useState<boolean>(false);
    const path = `${formId}.${name}`;
    const conditionPath = path.replace(`${displayName}`, condition.key);
    const value = useAppSelector((state) => getValue(state, path));
    const conditionValue = useAppSelector((state) => getValue(state, conditionPath));
    const dispatch = useAppDispatch();

    useEffect(() => {
        setConditionMet(conditionValue === condition.value);
        setRendered(conditionValue !== condition.value);
    }, [conditionValue]);

    useEffect(() => {
        if (value && !conditionMet && rendered) {
            dispatch(updateFormData({id: formId, path, data: null}));
        }
    }, [value, conditionMet]);

    const newSchema = _.cloneDeep(schema);
    // @ts-ignore
    newSchema._def.description = props.subTemplate ? JSON.stringify(props.subTemplate) : "{}";
    return (conditionMet ? <RenderTemplate
        schema={newSchema}
        name={name}
        sx={sx}
        gridSize={gridSize}
        formId={formId}

        shouldLabelObjects={shouldLabelObjects}
    /> : null);
};

