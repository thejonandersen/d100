import React, {useEffect, useState, useCallback, useContext} from "react";
import {capitalize, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {UnionTemplateProps} from "./types";
import useTemplateData from './useTemplateData'
import {GridWrap, StyleWrap} from './Wrappers'
import {Condition, Conditions, RegisterConditionParams} from '../useFormConditions'
import {FormContext} from './Form'
import {get} from 'lodash'

export const UnionTemplate: React.FC<UnionTemplateProps> = ({schema, name, sx, formId, props, gridWrap = true}) => {
    const [values, setValues] = useState<any[]>()
    const [value, setValue] = useState<string|string[]>();
    const {gridSize, initialData, registerConditions, displayText, conditions} = useContext(FormContext);
    const [allowMultiple, setAllowMultiple] = useState(false);
    const [ids, setIds] = useState<string[]>();
    const {handleChange, displayName} = useTemplateData({formId, name});

    const getOptionText = useCallback((value: any) => {
        if (typeof value !== 'string') {
            return value;
        }

        if (!displayText) {
            return capitalize(value);
        }

        return displayText[value] ? capitalize(displayText[value]) : capitalize(value);


    }, [displayText])

    const changeHandler = (e: any) => {
        handleChange(e);
        setValue(e.target.value);
    }

    useEffect(() => {
        if (props?.multiple) {
            setAllowMultiple(props.multiple);
        }

        // if we have conditions and they are relevant to the UnionTemplate
        if (props.conditions && !props.conditions.every((condition: Condition) => !!condition.equals)) {
            const parent = `${name?.split('.').slice(0,1)}`
            const fieldId = name?.replaceAll('.', '').replaceAll('[', '').replaceAll(']','') as string;
            const ids = registerConditions(props.conditions?.map((condition: RegisterConditionParams, index: number) => ({
                ...condition,
                parent,
                id: fieldId + index,
            })));

            setIds(ids);
        } else {
            setValues(schema.options.map((option: any) => option.value).sort());
        }

        const value = get(initialData, name as string);

        setValue(value ? value : props?.multiple ? [] : '');
    }, []);

    useEffect(() => {
        if (!ids || !conditions)
            return;

        const found = ids.reduce((pre: string[], cur: string) => {
            const condition: Condition = conditions[cur];
            if (condition && condition.optionsMet) {
                return [...pre, ...condition.optionsMet];
            }

            return pre;
        }, [])

        if (found.length) {
            setValues(found)
        }
    }, [conditions, ids]);

    return (values && <GridWrap gridWrap={gridWrap} gridSize={gridSize}>
        <StyleWrap sx={sx}>
            <FormControl fullWidth>
                <InputLabel id={`${displayName}-label`} shrink={!!value}>{capitalize(displayName)}</InputLabel>
                <Select
                    labelId={`${displayName}-label`}
                    id={`${displayName}-select`}
                    label={displayName}
                    multiple={allowMultiple}
                    onChange={changeHandler}
                    value={value}
                    variant="outlined"
                >
                    {values && values.map((value: any) => (value &&
                        <MenuItem key={value} value={value}>{getOptionText(value)}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </StyleWrap>
    </GridWrap>);
};
