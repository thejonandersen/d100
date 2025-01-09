import React from "react";
import {z} from "zod";
import {RenderTemplateProps} from "./types";
import {mapToPrimaryType, resolveSchema} from "./utils/resolveSchema";
import {BaseTemplates as Templates} from './Templates'

export const RenderTemplate: React.FC<RenderTemplateProps> = ({
    schema,
    errors,
    control,
    name,
    parent,
    props
}) => {
    const resolvedSchema = mapToPrimaryType(resolveSchema(schema));
    if (resolvedSchema.description) {
        try {
            const {template, ...rest} = JSON.parse(resolvedSchema.description);
            if (template === 'Conditional') {
                return <Templates.ConditionalTemplate schema={resolvedSchema} errors={errors} control={control}
                                                      name={name} parent={parent} props={rest}/>
            }

            if (template === 'AsyncSelect') {
                return <Templates.AsyncSelectionTemplate schema={resolvedSchema as z.ZodString} errors={errors}
                                                         control={control} name={name} parent={parent} props={rest}/>
            }
        } catch (e: any) {
            console.log('oops')
            console.error(e.message)
        }
    }

    console.log({description: resolvedSchema.description, name})

    if (
        resolvedSchema instanceof z.ZodString ||
        resolvedSchema instanceof z.ZodDate ||
        resolvedSchema instanceof z.ZodEnum
    ) {
        return <Templates.StringTemplate
            schema={resolvedSchema} errors={errors} control={control} name={name} parent={parent} props={props}/>;
    } else if (resolvedSchema instanceof z.ZodNumber) {
        return <Templates.NumberTemplate
            schema={resolvedSchema} errors={errors} control={control} name={name} parent={parent} props={props}/>;
    } else if (resolvedSchema instanceof z.ZodUnion<any>) {
        return <Templates.UnionTemplate
            schema={resolvedSchema} errors={errors} control={control} name={name} parent={parent} props={props}/>;
    } else if (resolvedSchema instanceof z.ZodObject) {
        return <Templates.ObjectTemplate
            schema={resolvedSchema} errors={errors} control={control} name={name} parent={parent} props={props}/>;
    } else if (resolvedSchema instanceof z.ZodArray) {
        return <Templates.ArrayTemplate
            schema={resolvedSchema} errors={errors} control={control} name={name} parent={parent} props={props}/>;
    } else if (resolvedSchema instanceof z.ZodBoolean) {
        return <Templates.BooleanTemplate
            schema={resolvedSchema} errors={errors} control={control} name={name} parent={parent} props={props}/>;
    }

    return null
};
