import React, {useEffect, useState} from "react";
import {capitalize, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {UnionTemplateProps} from "./types";
import useTemplateData from './useTemplateData'
import {GridWrap, StyleWrap} from './Wrappers'
import {useAppSelector} from '../../../state/hooks'
import {isEqual, get} from 'lodash';
import {getValue} from '../../../state/form/slice'

type Condition = {
    key: string;
    scope?: string;
    options: {
        [key: string]: string[];
    }
}

export const UnionTemplate: React.FC<UnionTemplateProps> = ({schema, name, sx, gridSize, formId, props, gridWrap = true}) => {
    const [values, setValues] = useState<any[]>(props.key ? [] : schema.options.map((option: any) => option.value).sort());
    let allowMultiple: boolean = false;
    const {defaultValue, handleChange, displayName} = useTemplateData({formId, name});
    const {conditions} = props;
    const conditionValue: any = useAppSelector((state) => conditions?.every((condition: Condition) => condition.scope === 'parent') ? getValue(state, `${formId}.${name?.split('.').slice(0,1)}`) : state.form.forms[formId]);

    useEffect(() => {
        if (conditions?.length) {
            const reducedOptions = conditions.reduce((pre: any[], condition: Condition) =>{
                const {key, options} = condition;
                if (options) {
                    const value = get(conditionValue, key);


                    const option = options[value];
                    if (option) {
                        return [
                            ...pre,
                            ...option,
                        ]
                    }
                }

                return pre;
            }, [])
            if (name === 'effects[0].typeModifierLevel') {
                console.log({reducedOptions, name})
                console.groupEnd()
            }

            if (reducedOptions?.length) {
                setValues(reducedOptions);
            }
        }
    }, [conditionValue, conditions]);


    return (<GridWrap gridWrap={gridWrap} gridSize={gridSize}>
        <StyleWrap sx={sx}>
            <FormControl fullWidth>
                <InputLabel id={`${displayName}-label`} shrink={!!defaultValue}>{capitalize(displayName)}</InputLabel>
                <Select
                    labelId={`${displayName}-label`}
                    id={`${displayName}-select`}
                    label={displayName}
                    multiple={allowMultiple}
                    onChange={handleChange}
                    value={defaultValue ? defaultValue : allowMultiple ? [] : ''}
                    variant="outlined"
                >
                    {values && values.map((value: any) => (value &&
                        <MenuItem key={value} value={value}>{typeof value === 'string' ? value.replace("_", " "): value}</MenuItem>))}
                </Select>
            </FormControl>
        </StyleWrap>
    </GridWrap>);
};
