import React, {useContext} from "react";
import {capitalize, TextField} from "@mui/material";
import {StringTemplateProps} from "./types";
import useTemplateData from './useTemplateData'
import {GridWrap, StyleWrap} from './Wrappers'
import {FormContext} from './Form'
import {get} from 'lodash'

export const StringTemplate: React.FC<StringTemplateProps> = ({name, sx, formId, gridWrap = true}) => {
    const {gridSize, initialData} = useContext(FormContext);
    const defaultValue = get(initialData, name as string);
    const {displayName, handleChange} = useTemplateData({formId, name});

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
