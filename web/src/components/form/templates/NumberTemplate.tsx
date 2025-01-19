import React from "react";
import {capitalize, InputAdornment, TextField} from "@mui/material";
import {NumberTemplateProps} from "./types";
import useTemplateData from './useTemplateData'
import {GridWrap, StyleWrap} from './Wrappers'

export const NumberTemplate: React.FC<NumberTemplateProps> = ({
    name, sx, gridSize, formId, shouldLabelObjects, gridWrap = true
}) => {
    const {defaultValue, handleChange, displayName} = useTemplateData({formId, name});
    return (<GridWrap gridWrap={gridWrap} gridSize={gridSize}>
        <StyleWrap sx={sx}>
            <TextField
                type="number"
                label={!shouldLabelObjects ? capitalize(displayName) : ""}
                variant="outlined"
                defaultValue={defaultValue}
                slotProps={sx && shouldLabelObjects ? {
                    input: {
                        startAdornment: <InputAdornment position="start">{displayName}:</InputAdornment>
                    }
                } : {}}
                fullWidth
                onChange={handleChange}
            />
        </StyleWrap>
    </GridWrap>);
};
