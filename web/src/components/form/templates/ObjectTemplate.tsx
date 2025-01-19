import React from "react";
import {capitalize} from "@mui/material";
import {RenderTemplate} from "./RenderTemplate";
import {ObjectTemplateProps} from "./types";
import {GridWrap, LabeledObject} from './Wrappers'

// Object Template
export const ObjectTemplate: React.FC<ObjectTemplateProps> = ({schema, name, gridSize, formId, shouldLabelObjects}) => {
    const displayName: string = name ? name.split(".").pop() as string : "";
    return (<GridWrap gridWrap gridSize={gridSize}>
        <LabeledObject label={capitalize(displayName)} shouldLabelObjects={shouldLabelObjects}>
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
