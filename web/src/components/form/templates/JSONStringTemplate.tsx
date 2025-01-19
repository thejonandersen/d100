import React from "react";
import {capitalize} from "@mui/material";
import {JSONStringTemplateProps} from "./types";
import {JsonEditor} from "json-edit-react";
import useTemplateData from './useTemplateData'

export const JSONStringTemplate: React.FC<JSONStringTemplateProps> = ({schema, name, formId}) => {
    const {defaultValue, handleChange, displayName} = useTemplateData({formId, name});
    return (<>
        <JsonEditor
            minWidth={"100%"}
            rootName={capitalize(displayName)}
            data={defaultValue ? JSON.parse(defaultValue) : null}
            onUpdate={handleChange}
        />
    </>);
};

