import React, {useEffect, useState, useContext} from "react";
import {capitalize, CircularProgress, FormControl, Grid2, InputLabel, MenuItem, Select} from "@mui/material";
import {AsyncSelectionTemplateProps} from "./types";
import useTemplateData from './useTemplateData'
import {StyleWrap} from './Wrappers'
import {useAppDispatch, useAppSelector} from '../../../state/hooks'
import {allSlices, Slices} from '../../../state/slices';
import {FormContext} from './Form'
import {get} from 'lodash'

export const AsyncSelectionTemplate: React.FC<AsyncSelectionTemplateProps> = ({
    name, props, schema, sx, formId
}) => {
    const {gridSize, initialData} = useContext(FormContext);
    const {handleChange, displayName} = useTemplateData({formId, name});
    const [open, setOpen] = useState<boolean>(false);
    const {all, load} = allSlices[props.collection as keyof Slices]
    const options: any[] = useAppSelector(all);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const defaultValue = get(initialData, name as string);

    // @ts-ignore
    const stateData: any = useAppSelector((state) => state[props.endpoint]);
    let multiple: boolean = false;

    try {
        if (schema.description) {
            multiple = JSON.parse(schema.description).multiple;
        }
    } catch (e: any) {
        console.error(e.message);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setLoading(false);
    };

    useEffect(() => {
        console.log({options})
        if (defaultValue && !options.length) {
            dispatch(load())
        }
    }, [defaultValue, options])

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
                    value={defaultValue ? defaultValue : multiple ? [] : ''}
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
