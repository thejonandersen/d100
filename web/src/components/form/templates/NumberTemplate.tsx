import React, {useContext} from "react";
import {capitalize, InputAdornment, TextField} from "@mui/material";
import {NumberTemplateProps} from "./types";
import useTemplateData from './useTemplateData';
import {GridWrap, StyleWrap} from './Wrappers';
import {FormContext} from './Form';
import {get} from 'lodash'

export const NumberTemplate: React.FC<NumberTemplateProps> = ({
    name, sx, formId, gridWrap = true
}) => {
    const {labelObjects, initialData, gridSize} = useContext(FormContext);
    const {handleChange, displayName} = useTemplateData({formId, name});
    const defaultValue = get(initialData, name as string);
    return (<GridWrap gridWrap={gridWrap} gridSize={gridSize}>
        <StyleWrap sx={sx}>
            <TextField
                type="number"
                label={!labelObjects ? capitalize(displayName) : ""}
                variant="outlined"
                defaultValue={defaultValue}
                slotProps={sx && labelObjects ? {
                    input: {
                        startAdornment: <InputAdornment position="start">{displayName}:</InputAdornment>
                    }
                } : {}}
                fullWidth
                onChange={e => handleChange(e, null, true)}
            />
        </StyleWrap>
    </GridWrap>);
};
