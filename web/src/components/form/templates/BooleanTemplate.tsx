import React from "react";
import {Checkbox, FormControlLabel} from "@mui/material";
import {BooleanTemplateProps} from "./types";
import useTemplateData from './useTemplateData'
import {GridWrap} from './Wrappers'

// Boolean Template
export const BooleanTemplate: React.FC<BooleanTemplateProps> = ({name, formId, gridSize, gridWrap = true}) => {
    const {displayName, defaultValue, handleChange} = useTemplateData({formId, name});
    return (
        <GridWrap gridWrap={gridWrap} gridSize={gridSize}>
            <FormControlLabel label={displayName} control={
                <Checkbox checked={!!defaultValue} onChange={handleChange}/>
            }/>
        </GridWrap>
    );
};
