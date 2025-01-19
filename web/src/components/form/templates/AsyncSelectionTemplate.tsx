import React, {useState} from "react";
import {capitalize, CircularProgress, FormControl, Grid2, InputLabel, MenuItem, Select} from "@mui/material";
import {AsyncSelectionTemplateProps} from "./types";
import useTemplateData from './useTemplateData'
import {StyleWrap} from './Wrappers'
import {API} from '../../../common/axios'

export const AsyncSelectionTemplate: React.FC<AsyncSelectionTemplateProps> = ({
    name, props, schema, gridSize, sx, formId
}) => {
    const {defaultValue, handleChange, displayName} = useTemplateData({formId, name});
    const [open, setOpen] = useState<boolean>(false);
    const [options, setOptions] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    let multiple: boolean = false;
    try {
        if (schema.description) {
            multiple = JSON.parse(schema.description).multiple;
        }
    } catch (e: any) {
        console.error(e.message);
    }

    if (!API) {
        throw new Error("to use AsyncSelectionTemplates, you must pass an AxiosInstance as api when creating your Form instance");
    }

    const loadOptions = async () => {
        try {
            const results = await API.get(props.endpoint);
            setOptions(results);
            setLoading(false);
        } catch (e: any) {
            console.error(e.message);
        }
    };

    const handleOpen = () => {
        setOpen(true);
        if (!options.length) {
            setLoading(true);
            loadOptions();
        }
    };

    const handleClose = () => {
        setOpen(false);
        setLoading(false);
    };

    return (<Grid2 size={{sm: 12, xs: 12, md: gridSize, lg: gridSize, xl: gridSize}}>
        <StyleWrap sx={sx}>
            <FormControl fullWidth>
                <InputLabel id={`${displayName}-select-label`}>{capitalize(displayName)}</InputLabel>
                <Select
                    labelId={`${displayName}-select-label`}
                    id={`${name}-select`}
                    label={displayName}
                    onOpen={handleOpen}
                    onClose={handleClose}
                    open={open}
                    multiple={multiple}
                    onChange={handleChange}
                    value={defaultValue}
                    variant="outlined"
                >
                    {loading ? <CircularProgress color="inherit" size={20}/> : null}
                    {options && options.map((option: any) => (option && <MenuItem key={option[props.selectionKey]}
                                                                                  value={option[props.selectionKey]}>{option.name.replace("_", " ")}</MenuItem>))}
                </Select>
            </FormControl>
        </StyleWrap>
    </Grid2>);
};
