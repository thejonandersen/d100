import React, {useEffect, useState} from "react";
import {z} from "zod";
import {Control, Controller, Field, FieldValues, useFieldArray, useForm, useWatch} from 'react-hook-form'
import {
    Box,
    Button,
    capitalize,
    Checkbox,
    CircularProgress,
    FormControl,
    FormControlLabel,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@mui/material';
import _ from 'lodash'
import {RenderTemplate} from './RenderTemplate'
import {mapToPrimaryType, resolveSchema} from "./utils";
import {JSONStringTemplateProps, StringTemplateProps} from './types'
import {
    ArrayItemProps,
    ArrayTemplateProps,
    AsyncSelectionTemplateProps,
    BooleanTemplateProps,
    ConditionalTemplateProps,
    FormRootProps,
    NumberTemplateProps,
    ObjectTemplateProps,
    Templates,
    UnionTemplateProps
} from "./types";
import {zodResolver} from '@hookform/resolvers/zod'
import IconResolver from '../IconResolver'
import {AxiosInstance} from 'axios'
import {JsonEditor} from 'json-edit-react'

let API: AxiosInstance;
const WrapperStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column"
};

const ComplexWrapperStyle: React.CSSProperties = {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
};

const getFieldValue = (name: string, control: Control<FieldValues, any>): any => {
    const parsedName: string = name.split('.').pop() || name;
    const field: Field = control._fields[parsedName as string] as Field;
    return field?._f.value;
}

// String Template
export const StringTemplate: React.FC<StringTemplateProps> = ({errors, control, name, parent, initialData}) => {
    const displayName: string = name ? name.split('.').pop() as string : '';
    return (
        <div style={WrapperStyle}>
            <Controller
                name={name as string}
                defaultValue={initialData ? initialData : ""}
                control={control}
                rules={{required: `${capitalize(displayName)} is required.`}}
                render={({field}: any) => (
                    <TextField
                        {...field}
                        label={capitalize(displayName)}
                        error={!!errors[name || '']}
                        helperText={errors[name || '']?.message}
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
        </div>
    );
};

// Number Template
export const NumberTemplate: React.FC<NumberTemplateProps> = ({errors, control, name, parent}) => {
    const displayName: string = name ? name.split('.').pop() as string : '';
    return (
        <div style={WrapperStyle}>
            <Controller
                name={name as string}
                defaultValue={""}
                control={control}
                render={({field}: any) => (
                    <TextField
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        type="number"
                        label={capitalize(displayName)}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
        </div>
    );
};

// Union (ENUM-ish) Template
export const UnionTemplate: React.FC<UnionTemplateProps> = ({schema, errors, control, name, parent}) => {
    const values = schema.options.map((option: any) => option.value);
    const displayName: string = name ? name.split('.').pop() as string : '';
    return (
        <div style={WrapperStyle}>
            <Controller
                name={name as string}
                defaultValue={""}
                control={control}
                rules={{required: `${capitalize(displayName)} is required.`}}
                render={({field}: any) => (
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{capitalize(displayName)}</InputLabel>
                        <Select
                            {...field}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label={displayName}
                        >
                            {values && values.map((value: any) => (
                                value && <MenuItem key={value} value={value}>{value.replace('_', ' ')}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            />
        </div>
    );
};

// Boolean Template
export const BooleanTemplate: React.FC<BooleanTemplateProps> = ({schema, errors, name, control, parent}) => {
    const displayName: string = name ? name.split('.').pop() as string : '';
    return (
        <div style={WrapperStyle}>
            <Controller
                name={name as string}
                defaultValue={""}
                control={control}
                rules={{required: `${capitalize(displayName)} is required.`}}
                render={({field}: any) => (
                    <FormControlLabel control={<Checkbox {...field} checked={field.value}/>} label="Label"/>
                )}
            />
        </div>
    );
};

// Helper function to check if schema is an ObjectSchema
const isObjectSchema = (schema: z.ZodTypeAny): schema is z.ZodObject<any> => {
    return resolveSchema(schema) instanceof z.ZodObject || mapToPrimaryType(schema) instanceof z.ZodObject
};

// Object Template
export const ObjectTemplate: React.FC<ObjectTemplateProps> = ({schema, errors, control, parent, name}) => {
    return (
        <div style={WrapperStyle}>
            {schema.shape &&
                Object.keys(schema.shape).map((key) => (
                    <Box sx={{pb: 0.5}}>
                        <RenderTemplate
                            key={`${parent !== undefined ? `${parent}.` : ''}${name}.key`}
                            schema={schema.shape[key]}
                            errors={errors}
                            name={key}
                            control={control}
                            parent={parent}
                        />
                    </Box>
                ))}

        </div>
    );
};

// Ensure the inner schema is correctly typed
const getInnerSchema = (schema: z.ZodArray<any>): z.ZodTypeAny => {
    return schema.element;
};

// Array Item
const ArrayItem: React.FC<ArrayItemProps> = ({schema, name, value, update, index, remove, control}) => {
    const {
        formState: {errors},
        control: subControl
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: value
    });
    const itemValue = useWatch({control: subControl})
    useEffect(() => {
        update(index, itemValue)
    }, [itemValue])
    const resolvedSchema = resolveSchema(schema);
    const displayName: string = name ? name.split('.').pop() as string : '';
    return (
        <Box sx={{
            p: 2,
            border: '1px solid rgba(0,0,0,0.3)',
            borderRadius: '4px'
        }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    pb: 1
                }}
            >
                <InputLabel>{capitalize(displayName.replace('s', ''))}:</InputLabel>
                <IconButton onClick={() => remove(index)}>
                    <IconResolver iconName="Delete" color="error"/>
                </IconButton>
            </Box>
            <RenderTemplate
                schema={resolvedSchema}
                errors={errors}
                control={subControl}
                name={displayName}
            />
        </Box>
    )
}

// Array Template
export const ArrayTemplate: React.FC<ArrayTemplateProps> = ({schema, errors, control, name}) => {
    const innerSchema = resolveSchema(getInnerSchema(schema)) as any;
    console.log({innerSchema: innerSchema.description, schema: schema.description, name})
    const {fields, append, remove, update} = useFieldArray({
        control,
        name: name as string
    });

    type DefaultProps = z.infer<typeof innerSchema>

    const defaults: DefaultProps = innerSchema.shape ? Object.keys(innerSchema.shape).reduce((previousValue, key) => ({
        ...previousValue,
        [key]: null
    }), {}) : {};
    const displayName: string = name ? name.replace('Id', '').split('.').pop() as string : '';
    console.log({displayName})
    return (
        <div style={WrapperStyle}>

            {fields.map((field, index) => {
                return (
                    <ArrayItem
                        index={index}
                        value={field}
                        update={update}
                        remove={remove}
                        errors={errors}
                        schema={innerSchema}
                        control={control}
                        name={displayName}
                    />
                )
            })}
            <Button
                onClick={() => append({})}
                variant="contained"
                color="success"
                startIcon={<IconResolver iconName="Add"/>}
                sx={{mt: fields.length ? 2 : 0}}
            >
                Add {capitalize(displayName.replace('s', ''))}
            </Button>
        </div>
    );
};

type Condition = {
    key: string;
    value: any;
}

export const ConditionalTemplate: React.FC<ConditionalTemplateProps> = ({
    schema,
    errors,
    control,
    parent,
    name,
    props
}) => {
    const condition: Condition = props.condition;
    const value = useWatch({control})
    const [conditionMet, setConditionMet] = useState<boolean>(false)

    useEffect(() => {
        if (!value) return;

        setConditionMet(value[condition.key] === condition.value);
    }, [value])

    const newSchema = _.cloneDeep(schema);
    // @ts-ignore
    newSchema._def.description = props.subTemplate ? JSON.stringify(props.subTemplate) : '{}';
    return (
        conditionMet ? <RenderTemplate
            schema={newSchema}
            errors={errors}
            name={name as string}
            control={control}
            parent={parent}
        /> : null
    );
};

export const AsyncSelectionTemplate: React.FC<AsyncSelectionTemplateProps> = ({
    name,
    control,
    props,
    schema,
    errors,
    parent,
}) => {
    const [open, setOpen] = useState<boolean>(false);
    const [options, setOptions] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    console.log({name, control, props})

    if (!API) {
        throw new Error('to use AsyncSelectionTemplates, you must pass an AxiosInstance as api when creating your Form instance')
    }

    const loadOptions = async () => {
        try {
            const results = await API.get(props.endpoint);
            setOptions(results);
            setLoading(false);
        } catch (e: any) {
            console.error(e.message);
        }
    }

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

    const displayName = name ? name.replace('Id', '') : '';

    return (
        <Controller
            name={name ?? ''}
            defaultValue={""}
            control={control}
            rules={{required: `${capitalize(displayName)} is required.`}}
            render={({field}: any) => (
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{capitalize(displayName)}</InputLabel>
                    <Select
                        {...field}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label={displayName}
                        onOpen={handleOpen}
                        onClose={handleClose}
                        open={open}
                    >
                        {loading ? <CircularProgress color="inherit" size={20}/> : null}
                        {options && options.map((option: any) => (
                            option && <MenuItem key={option[props.selectionKey]}
                                                value={option[props.selectionKey]}>{option.name.replace('_', ' ')}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        />
    );
}

export const JSONStringTemplate: React.FC<JSONStringTemplateProps> = ({schema, errors, control, name, parent}) => {
    let initialValue = {};
    const displayName: string = name ? name.split('.').pop() as string : '';
    try {
        const value: string = getFieldValue(name as string, control)
        if (value)
            initialValue = JSON.parse(value);
    } catch (e) {
        console.error(e);
    }
    return (
        <Controller
            name={name as string}
            defaultValue={'{}'}
            control={control}
            rules={{required: `${capitalize(displayName)} is required.`}}
            render={({field}: any) => (
                <JsonEditor data={initialValue} onUpdate={(data) => {
                    field.onChange(JSON.stringify(data.newData));
                }} />
            )}
        />
    )
}

/**
 * Form component that renders the form based on the schema.
 * @param {FormRootProps} props - The props for the BaseFormRoot.
 * @returns {JSX.Element} The form component.
 */
export const Form: React.FC<FormRootProps> = ({
    schema,
    handler,
    api,
    debug,
    initialData,
    onChange,
    isSubMenu
}) => {
    const {
        formState: {errors, isValid, isSubmitting},
        control,
        getValues,
        handleSubmit,
    } = useForm<z.infer<typeof schema>>({resolver: zodResolver(schema), defaultValues: initialData});
    const values = useWatch({ control });
    const resolvedSchema = resolveSchema(schema);
    API = api as AxiosInstance;

    useEffect(() => {
        if (!onChange) {
            return
        }

        onChange(values);
    }, [values])

    console.log({initialData})
    return (
        <form onSubmit={handleSubmit(handler)} style={ComplexWrapperStyle}>
            {isObjectSchema(resolvedSchema) &&
                Object.keys(resolvedSchema.shape).map((key) => {
                    return (
                        <RenderTemplate
                            key={key}
                            schema={resolvedSchema.shape[key]}
                            errors={errors}
                            control={control}
                            name={key}
                        />
                    )
                })}
            {!isSubMenu && (<Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button type="submit" disabled={!isValid || isSubmitting} variant="contained">Submit</Button>
            </Box>)}
            {debug && <Button onClick={() => {
                const values = getValues();
                console.log({values})
                console.log(resolvedSchema.safeParse(values))
            }}>get vals</Button>}
        </form>
    );
};

export const BaseTemplates: Templates = {
    StringTemplate,
    NumberTemplate,
    UnionTemplate,
    ObjectTemplate,
    BooleanTemplate,
    ArrayTemplate,
    ConditionalTemplate,
    AsyncSelectionTemplate,
    JSONStringTemplate
};
