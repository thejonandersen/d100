import React, {useEffect, useState} from "react";
import {z} from "zod";
import {Controller, useFieldArray, useForm, useWatch} from 'react-hook-form'
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
import type {StringTemplateProps} from './types'
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

// String Template
export const StringTemplate: React.FC<StringTemplateProps> = ({errors, control, name, parent}) => {
    const displayName: string = name ? name.split('.').pop() as string : '';
    return (
        <div style={WrapperStyle}>
            <Controller
                name={`${parent !== undefined ? `${parent}.` : ''}${name}`}
                defaultValue={""}
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
                name={`${parent !== undefined ? `${parent}.` : ''}${name}`}
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
                name={`${parent !== undefined ? `${parent}.` : ''}${name}`}
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
                name={`${parent !== undefined ? `${parent}.` : ''}${name}`}
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
                            name={`${parent !== undefined ? `${parent}.` : ''}${name !== undefined ? `${name}.` : ''}${key}`}
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
        formState: {errors, isValid, isSubmitting},
        handleSubmit,
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
            />
        </Box>
    )
}

// Array Template
export const ArrayTemplate: React.FC<ArrayTemplateProps> = ({schema, errors, control, name}) => {
    const innerSchema = resolveSchema(getInnerSchema(schema)) as any;
    const {fields, append, remove, update} = useFieldArray({
        control,
        name: name as string
    });

    type DefaultProps = z.infer<typeof innerSchema>

    const defaults: DefaultProps = innerSchema.shape ? Object.keys(innerSchema.shape).reduce((previousValue, key) => ({
        ...previousValue,
        [key]: null
    }), {}) : {};
    const displayName: string = name ? name.split('.').pop() as string : '';
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
            name={`${parent !== undefined ? `${parent}.` : ''}${name}`}
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
    parent
}) => {
    const [open, setOpen] = useState<boolean>(false);
    const [options, setOptions] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

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
            name={`${parent !== undefined ? `${parent}.` : ''}${name}`}
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

/**
 * Form component that renders the form based on the schema.
 * @param {FormRootProps} props - The props for the BaseFormRoot.
 * @returns {JSX.Element} The form component.
 */
export const Form: React.FC<FormRootProps> = ({
    schema,
    onSubmit,
    api,
    debug
}) => {
    const {
        formState: {errors, isValid, isSubmitting},
        control,
        getValues
    } = useForm<z.infer<typeof schema>>({resolver: zodResolver(schema)});
    const resolvedSchema = resolveSchema(schema);
    API = api as AxiosInstance;

    return (
        <form onSubmit={onSubmit} style={ComplexWrapperStyle}>
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
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="submit" disabled={!isValid || isSubmitting} variant="contained">Submit</Button>
            </Box>
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
    AsyncSelectionTemplate
};
