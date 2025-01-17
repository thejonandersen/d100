import React, {ChangeEvent, useEffect, useState} from "react";
import {z} from "zod";
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
import {mapToPrimaryType, resolveSchema} from "../utils";
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
import IconResolver from "../../IconResolver";
import {AxiosInstance} from "axios";
import {JsonEditor} from "json-edit-react";
import {getValue, registerForm, clearForm, updateFormData } from '../../../state/form/slice'
import {useAppSelector, useAppDispatch} from '../../../state/hooks'
import {useDispatch} from 'react-redux'

let API: AxiosInstance;
let shouldLabelObjects = false;

const GridWrap: React.FC<{ children: React.ReactElement, gridWrap: boolean, gridSize: number }> = ({children, gridWrap, gridSize}) => {
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
> = ({ name, sx, gridSize, formId, gridWrap = true}) => {
    const path = `${formId}.${name}`;
    const defaultValue = useAppSelector((state) => getValue(state, path));
    const dispatch = useAppDispatch();
    const displayName: string = name ? name.split(".").pop() as string : "";
    const handleChange = (e: any) => {
        dispatch(updateFormData({ id: formId, path, data: e.target.value }));
    }
    return (
        <GridWrap gridWrap={gridWrap} gridSize={gridSize}>
            <StyleWrap sx={sx}>
                <TextField
                    label={capitalize(displayName)}
                    variant="outlined"
                    fullWidth
                    defaultValue={defaultValue || ''}
                    onChange={handleChange}
                />
            </StyleWrap>
        </GridWrap>
    );
};

// Number Template
export const NumberTemplate: React.FC<
    NumberTemplateProps
> = ({name, sx, gridSize, formId, gridWrap = true}) => {
    const path = `${formId}.${name}`;
    const defaultValue = useAppSelector((state) => getValue(state, path));
    const dispatch = useAppDispatch();
    const displayName: string = name ? name.split(".").pop() as string : "";
    console.log(displayName, !sx, !shouldLabelObjects)
    const handleChange = (e: any) => {
        dispatch(updateFormData({ id: formId, path, data: e.target.value }));
    }
    return (
        <GridWrap gridWrap={gridWrap} gridSize={gridSize}>
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
        </GridWrap>
    );
};

// Union (ENUM-ish) Template
export const UnionTemplate: React.FC<
    UnionTemplateProps
> = ({schema, name, sx, gridSize, formId, gridWrap = true}) => {
    const values = schema.options.map((option: any) => option.value);
    let multiple: boolean = false;
    const path = `${formId}.${name}`;
    const defaultValue = useAppSelector((state) => getValue(state, path));
    const dispatch = useAppDispatch();
    const displayName: string = name ? name.split(".").pop() as string : "";
    const handleChange = (e: any) => {
        dispatch(updateFormData({ id: formId, path, data: e.target.value }));
    }
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
        <GridWrap gridWrap={gridWrap} gridSize={gridSize}>
            <StyleWrap sx={sx}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{capitalize(displayName)}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label={displayName}
                        multiple={multiple}
                        defaultValue={defaultValue}
                        onChange={handleChange}
                    >
                        {values && values.map((value: any) => (value &&
                            <MenuItem key={value} value={value}>{value.replace("_", " ")}</MenuItem>))}
                    </Select>
                </FormControl>
            </StyleWrap>
        </GridWrap>
    );
};

// Boolean Template
export const BooleanTemplate: React.FC<BooleanTemplateProps> = ({name}) => {
    const displayName: string = name ? name.split(".").pop() as string : "";
    return (
        // <Grid2 size={{sm: 12, xs: 12, md: gridSize, lg: gridSize, xl: gridSize}}>
        //     <FormControlLabel control={<Checkbox  checked label="Label"/>} />
        // </Grid2>
        null
    );
};

// Helper function to check if schema is an ObjectSchema
const isObjectSchema = (schema: z.ZodTypeAny): schema is z.ZodObject<any> => {
    return resolveSchema(schema) instanceof z.ZodObject || mapToPrimaryType(schema) instanceof z.ZodObject;
};

// Object Template
export const ObjectTemplate: React.FC<ObjectTemplateProps> = ({schema, name, gridSize, formId}) => {
    const displayName: string = name ? name.split(".").pop() as string : "";
    return (<GridWrap gridWrap gridSize={gridSize}>
        <LabeledObject label={capitalize(displayName)}>
            {schema.shape && Object.keys(schema.shape).map((key) => (
                <RenderTemplate
                    key={`${name}_${key}`}
                    schema={schema.shape[key]}
                    name={`${name}.${key}`}
                    gridWrap={false}
                    sx={{pb: 2}}
                    gridSize={gridSize}
                    formId={formId}
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
const ArrayItem: React.FC<ArrayItemProps> = ({schema, name, gridSize, formId}) => {
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
            <IconButton onClick={() => {}}>
                <IconResolver iconName="Delete" color="error"/>
            </IconButton>
        </Box>
        <RenderTemplate
            schema={resolvedSchema}
            name={displayName}
            gridSize={gridSize}
            formId={formId}
        />
    </Box>);
};

// Array Template
export const ArrayTemplate: React.FC<ArrayTemplateProps> = ({schema, name, gridSize, formId}) => {
    const innerSchema = resolveSchema(getInnerSchema(schema)) as any;
    const path = `${formId}.${name}`;
    const values = useAppSelector((state) => getValue(state, path));
    const dispatch = useAppDispatch();
    const displayName: string = name ? name.split(".").pop() as string : "";
    const handleAdd = (e: any) => {
        dispatch(updateFormData({ id: formId, path: `${path}[${[values.length]}]`, data: [] }));
    }
    if (innerSchema.description) {
        try {
            const template = JSON.parse(innerSchema.description).template;
            if (template)
                return (
                    <RenderTemplate
                        schema={innerSchema}
                        name={name}
                        gridSize={gridSize}
                        formId={formId}
                    />
                );
        } catch (e) {
            console.error(e);
        }
    }

    return (<>
        {values.map((_:any, index:number) => {
            return (<ArrayItem
                schema={innerSchema}
                name={`${name}[${index}]`}
                gridSize={gridSize}
                formId={formId}
            />);
        })}
        <Button
            onClick={handleAdd}
            variant="contained"
            color="success"
            startIcon={<IconResolver iconName="Add"/>}
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
         schema, name, props, sx, gridSize, formId
     }) => {
    const displayName: string = name ? name.replace("Id", "").split(".").pop() as string : "";
    const condition: Condition = props.condition;
    const [conditionMet, setConditionMet] = useState<boolean>(false);
    const path = `${formId}.${name}`;
    const conditionPath = path.replace(`${displayName}`, condition.key);
    const value = useAppSelector((state) => getValue(state, path));
    const conditionValue = useAppSelector((state) => getValue(state, conditionPath));
    const dispatch = useAppDispatch();

    useEffect(() => {
        setConditionMet(conditionValue === condition.value);
    }, [conditionValue]);

    useEffect(() => {
        if (value && ! conditionMet) {
            dispatch(updateFormData({ id: formId, path, data: null }));
        }
    }, [value, conditionMet]);

    const newSchema = _.cloneDeep(schema);
    // @ts-ignore
    newSchema._def.description = props.subTemplate ? JSON.stringify(props.subTemplate) : "{}";
    return (conditionMet ? <RenderTemplate
        schema={newSchema}
        name={name}
        sx={sx}
        gridSize={gridSize}
        formId={formId}
    /> : null);
};

export const AsyncSelectionTemplate: React.FC<
    AsyncSelectionTemplateProps
> = ({
         name,
         props,
         schema,
         gridSize,
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
                    >
                        {loading ? <CircularProgress color="inherit" size={20}/> : null}
                        {options && options.map((option: any) => (option &&
                            <MenuItem key={option[props.selectionKey]}
                                      value={option[props.selectionKey]}>{option.name.replace("_", " ")}</MenuItem>))}
                    </Select>
                </FormControl>
            </StyleWrap>
        </Grid2>
    );
};

export const JSONStringTemplate: React.FC<JSONStringTemplateProps> = ({schema, name}) => {
    let initialValue = {};
    const displayName: string = name ? name.split(".").pop() as string : "";

    return (
        <JsonEditor
            minWidth={"100%"}
            rootName={capitalize(displayName)}
            data={initialValue}
            onUpdate={(data) => {}}
        />
    );
};

/**
 * Form component that renders the form based on the schema.
 * @param {FormRootProps} props - The props for the BaseFormRoot.
 * @returns {JSX.Element} The form component.
 */
export const Form: React.FC<
    FormRootProps
> = ({
         schema, api, debug, initialData, isSubMenu, labelObjects = false, columns = 1, id
     }) => {
    const resolvedSchema = resolveSchema(schema);
    const dispatch = useAppDispatch();
    dispatch(registerForm({id, schema, data: initialData || {}}))
    API = api as AxiosInstance;
    shouldLabelObjects = labelObjects;

    return (<form>
        <Grid2 spacing={2} container>
            {isObjectSchema(resolvedSchema) && Object.keys(resolvedSchema.shape).map((key) => {
                return (<RenderTemplate
                    key={key}
                    schema={resolvedSchema.shape[key]}
                    name={key}
                    gridWrap={true}
                    gridSize={12/columns}
                    formId={id}
                />);
            })}
        </Grid2>
        {!isSubMenu && (<Box sx={{display: "flex", justifyContent: "flex-end"}}>
            <Button type="submit" variant="contained">Submit</Button>
        </Box>)}
        {/*{debug && <Button onClick={() => {*/}
        {/*    const values = getValues();*/}
        {/*    console.log({values});*/}
        {/*    console.log(resolvedSchema.safeParse(values));*/}
        {/*}}>get vals</Button>}*/}
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
