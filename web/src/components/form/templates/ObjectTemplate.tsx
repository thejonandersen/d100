import React, {useContext} from "react";
import {capitalize} from "@mui/material";
import {RenderTemplate} from "./RenderTemplate";
import {ObjectTemplateProps} from "./types";
import {GridWrap, LabeledObject} from './Wrappers';
import {FormContext} from './Form'

// Object Template
export const ObjectTemplate: React.FC<ObjectTemplateProps> = ({schema, name, formId, props }) => {

    const displayName: string = name ? name.split(".").pop() as string : "";
    const {labelObjects, gridSize} = useContext(FormContext)
    let label: string = props?.label || displayName;
    let shouldLabel: boolean | undefined = labelObjects || props?.shouldLabel;
    return (<GridWrap gridWrap gridSize={gridSize}>
        <LabeledObject label={capitalize(label)} shouldLabelObjects={shouldLabel} sx={{
            p: 2, border: "1px solid rgba(0,0,0,0.3)", borderRadius: "4px", minWidth: "100%"
        }}>
            {schema.shape && Object.keys(schema.shape).map((key) => (<RenderTemplate
                key={`${name}_${key}`}
                schema={schema.shape[key]}
                name={`${name}.${key}`}
                gridWrap={false}
                sx={{pb: 2}}
                formId={formId}
            />))}
        </LabeledObject>
    </GridWrap>);
};
