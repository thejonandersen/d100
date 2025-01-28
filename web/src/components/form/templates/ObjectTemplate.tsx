import React from "react";
import {capitalize} from "@mui/material";
import {RenderTemplate} from "./RenderTemplate";
import {ObjectTemplateProps} from "./types";
import {GridWrap, LabeledObject} from './Wrappers'

// Object Template
export const ObjectTemplate: React.FC<ObjectTemplateProps> = ({schema, name, gridSize, formId, shouldLabelObjects, props}) => {
    const displayName: string = name ? name.split(".").pop() as string : "";
    let label: string = props?.label || displayName;
    let shouldLabel: boolean | undefined = shouldLabelObjects || props?.shouldLabel;

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
                gridSize={gridSize}
                formId={formId}
                shouldLabelObjects={shouldLabelObjects}
            />))}
        </LabeledObject>
    </GridWrap>);
};
