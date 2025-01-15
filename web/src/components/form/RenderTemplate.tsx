import React from "react";
import {z} from "zod";
import {RenderTemplateProps} from "./types";
import {mapToPrimaryType, resolveSchema} from "./utils/resolveSchema";
import {BaseTemplates as Templates} from "./Templates";

export const RenderTemplate: React.FC<
    RenderTemplateProps
> = ({
         schema,
         errors,
         control,
         name,
         parent,
         props,
         initialData,
         gridWrap,
         sx
     }) => {
    if (name === "id") {
        return null;
    }
    const resolvedSchema = mapToPrimaryType(resolveSchema(schema));
    if (resolvedSchema.description || schema.description) {
        const description: string = resolvedSchema.description || schema.description || "{}";
        try {
            const {template, ...rest} = JSON.parse(description);

            if (template === "none") {
                return null;
            }

            if (template === "Conditional") {
                return <Templates.ConditionalTemplate schema={resolvedSchema} errors={errors} control={control}
                                                      name={name} parent={parent} props={rest}
                                                      initialData={initialData} gridWrap={gridWrap} sx={sx}/>;
            }

            if (template === "AsyncSelect") {
                return <Templates.AsyncSelectionTemplate schema={resolvedSchema as z.ZodString} errors={errors}
                                                         control={control} name={name} parent={parent} props={rest}
                                                         initialData={initialData} gridWrap={gridWrap} sx={sx}/>;
            }

            if (template === "JSON") {
                return <Templates.JSONStringTemplate errors={errors} control={control} schema={schema} name={name}
                                                     parent={parent} gridWrap={gridWrap} sx={sx}/>;
            }
        } catch (e: any) {
            console.log("oops");
            console.error(e.message);
        }
    }

    if (
        resolvedSchema instanceof z.ZodString ||
        resolvedSchema instanceof z.ZodDate ||
        resolvedSchema instanceof z.ZodEnum
    ) {
        return <Templates.StringTemplate
            schema={resolvedSchema} errors={errors} control={control} name={name} parent={parent} props={props}
            initialData={initialData} gridWrap={gridWrap} sx={sx}/>;
    } else if (resolvedSchema instanceof z.ZodNumber) {
        return <Templates.NumberTemplate
            schema={resolvedSchema} errors={errors} control={control} name={name} parent={parent} props={props}
            initialData={initialData} gridWrap={gridWrap} sx={sx}/>;
    } else if (resolvedSchema instanceof z.ZodUnion) {
        return <Templates.UnionTemplate
            schema={resolvedSchema} errors={errors} control={control} name={name} parent={parent} props={props}
            initialData={initialData} gridWrap={gridWrap} sx={sx}/>;
    } else if (resolvedSchema instanceof z.ZodObject) {
        return <Templates.ObjectTemplate
            schema={resolvedSchema} errors={errors} control={control} name={name} parent={parent} props={props}
            initialData={initialData} gridWrap={gridWrap} sx={sx}/>;
    } else if (resolvedSchema instanceof z.ZodArray) {
        return <Templates.ArrayTemplate
            schema={resolvedSchema} errors={errors} control={control} name={name} parent={parent} props={props}
            initialData={initialData} gridWrap={gridWrap} sx={sx}/>;
    } else if (resolvedSchema instanceof z.ZodBoolean) {
        return <Templates.BooleanTemplate
            schema={resolvedSchema} errors={errors} control={control} name={name} parent={parent} props={props}
            initialData={initialData} gridWrap={gridWrap} sx={sx}/>;
    }

    return null;
};
