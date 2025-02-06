import React, {useContext, useEffect} from "react";
import {capitalize} from "@mui/material";
import {JSONStringTemplateProps} from "./types";
import {JsonEditor} from "json-edit-react";
import useTemplateData from './useTemplateData'
import {FormContext} from './Form'
import {get} from 'lodash'

export const JSONStringTemplate: React.FC<JSONStringTemplateProps> = ({schema, name, formId}) => {
    const {handleChange, displayName} = useTemplateData({formId, name});
    const {initialData} = useContext(FormContext);
    const defaultValue = get(initialData, name as string);

    useEffect(() => {
        try {
            console.log(defaultValue)
            JSON.parse(defaultValue)
        } catch (e) {
            console.log(e)
        }
    }, [defaultValue]);
    return (<>
        <JsonEditor
            minWidth={"100%"}
            rootName={capitalize(displayName)}
            data={defaultValue ? JSON.parse(defaultValue) : {}}
            onUpdate={handleChange}
        />
    </>);
};

