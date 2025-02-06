import React, {useContext} from "react";
import {Checkbox, FormControlLabel} from "@mui/material";
import {BooleanTemplateProps} from "./types";
import useTemplateData from './useTemplateData'
import {GridWrap} from './Wrappers'
import {FormContext} from './Form'
import {get} from 'lodash'

// Boolean Template
export const BooleanTemplate: React.FC<BooleanTemplateProps> = ({name, formId, gridWrap = true}) => {
    const {initialData, gridSize} = useContext(FormContext);
    const {displayName, handleChange} = useTemplateData({formId, name});
    const defaultValue = get(initialData, name as string);

    return (
        <GridWrap gridWrap={gridWrap} gridSize={gridSize}>
            <FormControlLabel label={displayName} control={
                <Checkbox checked={!!defaultValue} onChange={handleChange}/>
            }/>
        </GridWrap>
    );
};
