import React, {useEffect, useState} from "react";
import {z} from "zod";
import {Control, Controller, Field, FieldValues, useFieldArray, useForm, useWatch} from "react-hook-form";
import {
    Box,
    Button,
    capitalize,
    Checkbox,
    CircularProgress,
    FormControl,
    FormControlLabel,
    Grid2,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import _ from "lodash";
import {RenderTemplate} from "./RenderTemplate";
import {mapToPrimaryType, resolveSchema} from "./utils";
import {
    ArrayItemProps,
    ArrayTemplateProps,
    AsyncSelectionTemplateProps,
    BooleanTemplateProps,
    ConditionalTemplateProps,
    FormRootProps,
    JSONStringTemplateProps,
    NumberTemplateProps,
    ObjectTemplateProps,
    StringTemplateProps,
    Templates,
    UnionTemplateProps
} from "./types";
import {zodResolver} from "@hookform/resolvers/zod";
import IconResolver from "../IconResolver";
import {AxiosInstance} from "axios";
import {JsonEditor} from "json-edit-react";

let API: AxiosInstance;
let gridSize: number = 12;
let shouldLabelObjects = false;
let globalReplace;

const getFieldValue = (name: string, control: Control<FieldValues, any>): any => {
    const parsedName: string = name.split(".").pop() || name;
    const field: Field = control._fields[parsedName as string] as Field;
    return field?._f.value;
};

const GridWrap: React.FC<{ children: React.ReactElement, gridWrap: boolean }> = ({children, gridWrap}) => {
    return (
        <>
            {gridWrap ? (
                <Grid2 size={{sm: 12, xs: 12, md: gridSize, lg: gridSize, xl: gridSize}}>
                    {children}
                </Grid2>
            ) : (<>{children}</>)}
        </>
    );
};

const StyleWrap: React.FC<{ children: React.ReactElement, sx: any }> = ({children, sx}) => {
    return (
        <>
            {sx ? (
                <Box sx={sx}>
                    {children}
                </Box>
            ) : (<>{children}</>)}
        </>
    );
};

const LabeledObject: React.FC<{ children: React.ReactElement, label: string }> = ({children, label}) => {
    return (
        <>
            {shouldLabelObjects ? (
                <Box>
                    <Typography>{label}</Typography>
                    {children}
                </Box>
            ) : (<>{children}</>)}
        </>
    );
};

// String Template
export const StringTemplate: React.FC<
    StringTemplateProps
> = ({errors, control, name, initialData, sx, gridWrap = true}) => {
    const displayName: string = name ? name.split(".").pop() as string : "";
    return (
        <GridWrap gridWrap={gridWrap}>
            <StyleWrap sx={sx}>
                <Controller
                    name={name as string}
                    defaultValue={initialData ? initialData : ""}
                    control={control}
                    rules={{required: `${capitalize(displayName)} is required.`}}
                    render={({field}: any) => (<TextField
                        {...field}
                        label={capitalize(displayName)}
                        error={!!errors[name || ""]}
                        helperText={errors[name || ""]?.message}
                        variant="outlined"
                        fullWidth
                    />)}
                />
            </StyleWrap>
        </GridWrap>
    );
};

// Number Template
export const NumberTemplate: React.FC<
    NumberTemplateProps
> = ({errors, control, name, initialData, sx, gridWrap = true}) => {
    const displayName: string = name ? name.split(".").pop() as string : "";
    return (
        <GridWrap gridWrap={gridWrap}>
            <StyleWrap sx={sx}>
                <Controller
                    name={name as string}
                    defaultValue={initialData ? initialData : ""}
                    control={control}
                    render={({field}: any) => (<TextField
                        {...field}
                        onBlur={(e) => field.onChange(Number(e.target.value))}
                        type="number"
                        label={!sx && !shouldLabelObjects ? capitalize(displayName) : ""}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        variant="outlined"
                        slotProps={sx && shouldLabelObjects ? {
                            input: {
                                startAdornment: <InputAdornment position="start">{displayName}:</InputAdornment>
                            }
                        } : {}}
                        fullWidth
                    />)}
                />
            </StyleWrap>
        </GridWrap>
    );
};

// Union (ENUM-ish) Template
export const UnionTemplate: React.FC<
    UnionTemplateProps
> = ({schema, control, name, initialData, sx, gridWrap = true}) => {
    const values = schema.options.map((option: any) => option.value);
    const displayName: string = name ? name.split(".").pop() as string : "";
    let multiple: boolean = false;
    try {
        if (schema.description) {
            multiple = JSON.parse(schema.description).multiple;
        }
    } catch (e: any) {
        console.error(e.message);
    }

    useEffect(() => {

    }, []);

    return (
        <GridWrap gridWrap={gridWrap}>
            <StyleWrap sx={sx}>
                <Controller
                    name={name as string}
                    defaultValue={initialData ? initialData: ''}
                    control={control}
                    rules={{required: `${capitalize(displayName)} is required.`}}
                    render={({field}: any) => (<FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{capitalize(displayName)}</InputLabel>
                        <Select
                            {...field}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label={displayName}
                            multiple={multiple}
                        >
                            {values && values.map((value: any) => (value &&
                                <MenuItem key={value} value={value}>{value.replace("_", " ")}</MenuItem>))}
                        </Select>
                    </FormControl>)}
                />
            </StyleWrap>
        </GridWrap>
    );
};

// Boolean Template
export const BooleanTemplate: React.FC<BooleanTemplateProps> = ({schema, errors, name, control, parent}) => {
    const displayName: string = name ? name.split(".").pop() as string : "";
    return (
        <Grid2 size={{sm: 12, xs: 12, md: gridSize, lg: gridSize, xl: gridSize}}>
            <Controller
                name={name as string}
                defaultValue={""}
                control={control}
                rules={{required: `${capitalize(displayName)} is required.`}}
                render={({field}: any) => (
                    <FormControlLabel control={<Checkbox {...field} checked={field.value}/>} label="Label"/>)}
            />
        </Grid2>
    );
};

// Helper function to check if schema is an ObjectSchema
const isObjectSchema = (schema: z.ZodTypeAny): schema is z.ZodObject<any> => {
    return resolveSchema(schema) instanceof z.ZodObject || mapToPrimaryType(schema) instanceof z.ZodObject;
};

// Object Template
export const ObjectTemplate: React.FC<ObjectTemplateProps> = ({schema, errors, control, parent, name, initialData}) => {
    const displayName: string = name ? name.split(".").pop() as string : "";
    return (<GridWrap gridWrap>
        <LabeledObject label={capitalize(displayName)}>
            {schema.shape && Object.keys(schema.shape).map((key) => (
                <RenderTemplate
                    key={`${name}_${key}`}
                    schema={schema.shape[key]}
                    errors={errors}
                    name={`${name}.${key}`}
                    control={control}
                    parent={parent}
                    initialData={initialData[key]}
                    gridWrap={false}
                    sx={{pb: 2}}
                />
            ))}
        </LabeledObject>
    </GridWrap>);
};

// Ensure the inner schema is correctly typed
const getInnerSchema = (schema: z.ZodArray<any>): z.ZodTypeAny => {
    return schema.element;
};

// Array Item
const ArrayItem: React.FC<ArrayItemProps> = ({schema, name, value, update, index, remove, control}) => {
    const {
        formState: {errors}, control: subControl
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema), defaultValues: value
    });
    const itemValue = useWatch({control: subControl});
    useEffect(() => {
        console.log({itemValue})
        if (itemValue) {
            setTimeout(()=>{
                update(index, itemValue)
            }, 1000)
        }
    }, [itemValue]);
    const resolvedSchema = resolveSchema(schema);
    const displayName: string = name ? name.split(".").pop() as string : "";
    return (<Box sx={{
        p: 2, border: "1px solid rgba(0,0,0,0.3)", borderRadius: "4px",
        minWidth: "100%"
    }}>
        <Box
            sx={{
                display: "flex", justifyContent: "space-between", pb: 1
            }}
        >
            <InputLabel>{capitalize(displayName.replace("s", ""))}:</InputLabel>
            <IconButton onClick={() => remove(index)}>
                <IconResolver iconName="Delete" color="error"/>
            </IconButton>
        </Box>
        <RenderTemplate
            schema={resolvedSchema}
            errors={errors}
            control={subControl}
            name={displayName}
            initialData={itemValue}
        />
    </Box>);
};

// Array Template
export const ArrayTemplate: React.FC<ArrayTemplateProps> = ({schema, errors, control, name}) => {
    const innerSchema = resolveSchema(getInnerSchema(schema)) as any;
    const displayName: string = name ? name.replace("Id", "").split(".").pop() as string : "";
    const {fields, append, remove, update, replace} = useFieldArray({
        control, name: name as string
    });
    globalReplace = replace
    if (innerSchema.description) {
        try {
            const template = JSON.parse(innerSchema.description).template;
            if (template)
                return (
                    <RenderTemplate
                        schema={innerSchema}
                        name={name}
                        control={control}
                        errors={errors}
                    />
                );
        } catch (e) {
            console.error(e);
        }
    }

    type DefaultProps = z.infer<typeof innerSchema>

    const defaults: DefaultProps = innerSchema.shape ? Object.keys(innerSchema.shape).reduce((previousValue, key) => ({
        ...previousValue, [key]: null
    }), {}) : {};
    return (<>
        {fields.map((field, index) => {
            return (<ArrayItem
                index={index}
                value={field}
                update={update}
                remove={remove}
                errors={errors}
                schema={innerSchema}
                control={control}
                name={displayName}
            />);
        })}
        <Button
            onClick={() => append({})}
            variant="contained"
            color="success"
            startIcon={<IconResolver iconName="Add"/>}
            sx={{mt: fields.length ? 2 : 0}}
        >
            Add {capitalize(displayName.replace("s", ""))}
        </Button>
    </>);
};

type Condition = {
    key: string; value: any;
}

export const ConditionalTemplate: React.FC<
    ConditionalTemplateProps
> = ({
         schema, errors, control, parent, name, props, sx
     }) => {
    const parentName = name ? name.split(".")[0] : name as string;
    const displayName: string = name ? name.replace("Id", "").split(".").pop() as string : "";
    const condition: Condition = props.condition;
    const value = useWatch({control, name: parentName});
    const [conditionMet, setConditionMet] = useState<boolean>(false);


    useEffect(() => {
        console.log(value, condition.key, name)
        if (!value) return;

        setConditionMet(value[condition.key] === condition.value);
    }, [value]);

    const newSchema = _.cloneDeep(schema);
    // @ts-ignore
    newSchema._def.description = props.subTemplate ? JSON.stringify(props.subTemplate) : "{}";
    return (conditionMet ? <RenderTemplate
        schema={newSchema}
        errors={errors}
        name={displayName}
        control={control}
        parent={parent}
        sx={sx}
    /> : null);
};

export const AsyncSelectionTemplate: React.FC<
    AsyncSelectionTemplateProps
> = ({
         name,
         control,
         props,
         schema,
         errors,
         parent,
         sx
     }) => {
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

    const displayName = name ? name.replace("Id", "") : "";

    return (
        <Grid2 size={{sm: 12, xs: 12, md: gridSize, lg: gridSize, xl: gridSize}}>
            <StyleWrap sx={sx}>
                <Controller
                    name={name ?? ""}
                    defaultValue={multiple ? [] : ""}
                    control={control}
                    rules={{required: `${capitalize(displayName)} is required.`}}
                    render={({field}: any) => (<FormControl fullWidth>
                        <InputLabel id={`${displayName}-select-label`}>{capitalize(displayName)}</InputLabel>
                        <Select
                            {...field}
                            labelId={`${displayName}-select-label`}
                            id={`${name}-select`}
                            label={displayName}
                            onOpen={handleOpen}
                            onClose={handleClose}
                            open={open}
                            multiple={multiple}
                        >
                            {loading ? <CircularProgress color="inherit" size={20}/> : null}
                            {options && options.map((option: any) => (option &&
                                <MenuItem key={option[props.selectionKey]}
                                          value={option[props.selectionKey]}>{option.name.replace("_", " ")}</MenuItem>))}
                        </Select>
                    </FormControl>)}
                />
            </StyleWrap>
        </Grid2>
    );
};

export const JSONStringTemplate: React.FC<JSONStringTemplateProps> = ({schema, errors, control, name, parent}) => {
    let initialValue = {};
    const displayName: string = name ? name.split(".").pop() as string : "";
    try {
        const value: string = getFieldValue(name as string, control);
        if (value) initialValue = JSON.parse(value);
    } catch (e) {
        console.error(e);
    }
    return (<Controller
        name={name as string}
        defaultValue={"{}"}
        control={control}
        rules={{required: `${capitalize(displayName)} is required.`}}
        render={({field}: any) => (
            <JsonEditor
                minWidth={"100%"}
                rootName={capitalize(displayName)}
                data={initialValue}
                onUpdate={(data) => {
                    field.onChange(JSON.stringify(data.newData));
                }}
            />
        )}
    />);
};

/**
 * Form component that renders the form based on the schema.
 * @param {FormRootProps} props - The props for the BaseFormRoot.
 * @returns {JSX.Element} The form component.
 */
export const Form: React.FC<
    FormRootProps
> = ({
         schema, handler, api, debug, initialData, onChange, isSubMenu, labelObjects = false, columns = 1
     }) => {
    const {
        formState: {errors, isValid, isSubmitting}, control, getValues, handleSubmit, setValue
    } = useForm<z.infer<typeof schema>>({resolver: zodResolver(schema), defaultValues: initialData});
    const values = useWatch({control});
    const resolvedSchema = resolveSchema(schema);
    API = api as AxiosInstance;
    gridSize = 12 / columns;
    shouldLabelObjects = labelObjects;

    useEffect(() => {
        if (!onChange) {
            return;
        }

        onChange(values);
    }, [values]);

    return (<form onSubmit={handleSubmit(handler)}>
        <Grid2 spacing={2} container>
            {isObjectSchema(resolvedSchema) && Object.keys(resolvedSchema.shape).map((key) => {
                return (<RenderTemplate
                    key={key}
                    schema={resolvedSchema.shape[key]}
                    errors={errors}
                    control={control}
                    name={key}
                    initialData={initialData ? initialData[key]: null}
                    gridWrap={true}
                />);
            })}
        </Grid2>
        {!isSubMenu && (<Box sx={{display: "flex", justifyContent: "flex-end"}}>
            <Button type="submit" disabled={!isValid || isSubmitting} variant="contained">Submit</Button>
        </Box>)}
        {debug && <Button onClick={() => {
            const values = getValues();
            console.log({values});
            console.log(resolvedSchema.safeParse(values));
        }}>get vals</Button>}
    </form>);
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
