import React, {useCallback, useEffect, useState} from "react";
import {capitalize, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {UnionTemplateProps} from "./types";
import useTemplateData from './useTemplateData'
import {GridWrap, StyleWrap} from './Wrappers'


export const UnionTemplate: React.FC<UnionTemplateProps> = ({schema, name, sx, gridSize, formId, gridWrap = true}) => {
    const [currentValue, setCurrentValue] = useState<string>();
    const values = schema.options.map((option: any) => option.value).sort();
    let multiple: boolean = false;
    const {defaultValue, handleChange, displayName} = useTemplateData({formId, name});
    try {
        if (schema.description) {
            multiple = JSON.parse(schema.description).multiple;
        }
    } catch (e: any) {
        console.error(e.message);
    }

    return (<GridWrap gridWrap={gridWrap} gridSize={gridSize}>
        <StyleWrap sx={sx}>
            <FormControl fullWidth>
                <InputLabel id={`${displayName}-label`} shrink={!!defaultValue}>{capitalize(displayName)}</InputLabel>
                <Select
                    labelId={`${displayName}-label`}
                    id={`${displayName}-select`}
                    label={displayName}
                    multiple={multiple}
                    onChange={handleChange}
                    value={defaultValue || ''}
                    variant="outlined"
                >
                    {values && values.map((value: any) => (value &&
                        <MenuItem key={value} value={value}>{value.replace("_", " ")}</MenuItem>))}
                </Select>
            </FormControl>
        </StyleWrap>
    </GridWrap>);
};
