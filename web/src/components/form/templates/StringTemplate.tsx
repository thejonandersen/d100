import React from "react";
import {capitalize, TextField} from "@mui/material";
import {StringTemplateProps} from "./types";
import useTemplateData from './useTemplateData'
import {GridWrap, StyleWrap} from './Wrappers'

export const StringTemplate: React.FC<StringTemplateProps> = ({name, sx, gridSize, formId, gridWrap = true}) => {
    const {defaultValue, handleChange, displayName} = useTemplateData({formId, name});

    return (<GridWrap gridWrap={gridWrap} gridSize={gridSize}>
        <StyleWrap sx={sx}>
            <TextField
                label={capitalize(displayName)}
                variant="outlined"
                fullWidth
                defaultValue={defaultValue || ''}
                onChange={handleChange}
            />
        </StyleWrap>
    </GridWrap>);
};
