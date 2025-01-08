import React, {useEffect, useState} from "react";
import { z } from "zod";
import {Controller, useWatch, useForm, useFieldArray} from 'react-hook-form'
import {
    TextField,
    capitalize,
    Button,
    Select,
    FormControl,
    MenuItem,
    InputLabel,
    FormControlLabel,
    Checkbox,
    Box,
    IconButton
} from '@mui/material';
import _ from 'lodash'
import {RenderTemplate} from './RenderTemplate'
import {mapToPrimaryType, resolveSchema} from "./utils";
import {
    ArrayItemProps,
    ArrayTemplateProps,
    BooleanTemplateProps, ConditionalTemplateProps,
    FormRootProps,
    NumberTemplateProps,
    ObjectTemplateProps,
    Templates,
    UnionTemplateProps
} from "./types";
import {zodResolver} from '@hookform/resolvers/zod'
import IconResolver from '../IconResolver'
import type {StringTemplateProps} from './types'

const WrapperStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const ComplexWrapperStyle: React.CSSProperties = {
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

// String Template
export const StringTemplate: React.FC<StringTemplateProps> = ({ errors, control, name, parent }) => {
    const displayName:string = name ? name.split('.').pop() as string : '';
    return (
    <div style={WrapperStyle}>
      <Controller
          name={`${parent !== undefined ? `${parent}.`:''}${name}`}
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
export const NumberTemplate: React.FC<NumberTemplateProps> = ({ errors, control, name, parent }) => {
    const displayName:string = name ? name.split('.').pop() as string : '';
    return (
      <div style={WrapperStyle}>
          <Controller
              name={`${parent !== undefined ? `${parent}.`:''}${name}`}
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
export const UnionTemplate: React.FC<UnionTemplateProps> = ({ schema, errors, control, name, parent }) => {
    const values = schema.options.map((option: any) => option.value);
    const displayName:string = name ? name.split('.').pop() as string : '';
    return (
        <div style={WrapperStyle}>
            <Controller
                name={`${parent !== undefined ? `${parent}.`:''}${name}`}
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
export const BooleanTemplate: React.FC<BooleanTemplateProps> = ({ schema, errors, name, control, parent }) => {
    const displayName:string = name ? name.split('.').pop() as string : '';
    return (
    <div style={WrapperStyle}>
        <Controller
            name={`${parent !== undefined ? `${parent}.`:''}${name}`}
            defaultValue={""}
            control={control}
            rules={{required: `${capitalize(displayName)} is required.`}}
            render={({field}: any) => (
                <FormControlLabel control={<Checkbox {...field} checked={field.value} />} label="Label" />
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
export const ObjectTemplate: React.FC<ObjectTemplateProps> = ({ schema, errors, control, parent, name }) => {
    return (
    <div style={WrapperStyle}>
        {schema.shape &&
          Object.keys(schema.shape).map((key) => (
            <Box sx={{pb: 0.5}}>
                <RenderTemplate
                    key={`${parent !== undefined ? `${parent}.`:''}${name}.key`}
                    schema={schema.shape[key]}
                    errors={errors}
                    name={`${parent !== undefined ? `${parent}.`:''}${name!== undefined ? `${name}.`:''}${key}`}
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
        defaultValues: value,
    });
    const itemValue = useWatch({control: subControl})
    useEffect(() => {
        update(index, itemValue)
    }, [itemValue])
    const resolvedSchema = resolveSchema(schema);
    const displayName:string = name ? name.split('.').pop() as string : '';
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
                    pb: 1,
                }}
            >
                <InputLabel>{capitalize(displayName.replace('s', ''))}:</InputLabel>
                <IconButton onClick={() => remove(index)}>
                    <IconResolver iconName="Delete" color="error" />
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
export const ArrayTemplate: React.FC<ArrayTemplateProps> = ({ schema, errors, control, name}) => {
    const innerSchema = resolveSchema(getInnerSchema(schema)) as any;
    const { fields, append, remove, update} = useFieldArray({
        control,
        name: name as string
    });

    type DefaultProps = z.infer<typeof innerSchema>

    const defaults: DefaultProps = innerSchema.shape ? Object.keys(innerSchema.shape).reduce((previousValue, key) => ({...previousValue, [key]: null}), {}) : {};
    const displayName:string = name ? name.split('.').pop() as string : '';
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
              startIcon={<IconResolver iconName="Add" />}
              sx={{mt: fields.length ? 2:0}}
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

export const ConditionalTemplate: React.FC<ConditionalTemplateProps> = ({ schema, errors, control, parent, name, props }) => {
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
                name={`${parent !== undefined ? `${parent}.`:''}${name}`}
                control={control}
                parent={parent}
            /> : null
    );
};

/**
 * Form component that renders the form based on the schema.
 * @param {FormRootProps} props - The props for the BaseFormRoot.
 * @returns {JSX.Element} The form component.
 */
export const Form: React.FC<FormRootProps> = ({
    schema,
    onSubmit
}) => {
    const {
        formState: {errors, isValid, isSubmitting},
        control,
        getValues,
    } = useForm<z.infer<typeof schema>>({resolver: zodResolver(schema)});
  const resolvedSchema = resolveSchema(schema);

  return (
    <form onSubmit={onSubmit} style={ComplexWrapperStyle}>
      {isObjectSchema(resolvedSchema) &&
        Object.keys(resolvedSchema.shape).map((key) => {
            return(
              <RenderTemplate
                key={key}
                schema={resolvedSchema.shape[key]}
                errors={errors}
                control={control}
                name={key}
              />
        )})}
      <Button type="submit" disabled={!isValid || isSubmitting}>Submit</Button>
        <Button onClick={() => {
            const values = getValues();
            console.log({ values })
            console.log(resolvedSchema.safeParse(values))
        }}>get vals</Button>
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
};
