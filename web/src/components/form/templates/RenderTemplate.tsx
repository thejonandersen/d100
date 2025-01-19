import React from "react";
import {z} from "zod";
import {RenderTemplateProps} from "./types";
import {mapToPrimaryType, resolveSchema} from "../utils";
import {BaseTemplates as Templates} from "./";

export const RenderTemplate: React.FC<
    RenderTemplateProps
> = ({
    schema,
    name,
    props,
    gridWrap,
    sx,
    gridSize,
    formId,
    shouldLabelObjects
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
                return <Templates.ConditionalTemplate schema={resolvedSchema}
                                                      name={name} props={rest}
                                                      gridWrap={gridWrap} sx={sx} gridSize={gridSize}
                                                      formId={formId} shouldLabelObjects={shouldLabelObjects}/>;
            }

            if (template === "AsyncSelect") {
                return <Templates.AsyncSelectionTemplate schema={resolvedSchema as z.ZodString}
                                                         name={name} props={rest}
                                                         gridWrap={gridWrap} sx={sx} gridSize={gridSize}
                                                         formId={formId} shouldLabelObjects={shouldLabelObjects}/>;
            }

            if (template === "JSON") {
                return <Templates.JSONStringTemplate schema={schema} name={name}
                                                     gridWrap={gridWrap} sx={sx} gridSize={gridSize}
                                                     formId={formId} shouldLabelObjects={shouldLabelObjects}/>;
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
            schema={resolvedSchema} name={name} props={props}
            gridWrap={gridWrap} sx={sx} gridSize={gridSize}
            formId={formId} shouldLabelObjects={shouldLabelObjects}/>;
    } else if (resolvedSchema instanceof z.ZodNumber) {
        return <Templates.NumberTemplate
            schema={resolvedSchema} name={name} props={props}
            gridWrap={gridWrap} sx={sx} gridSize={gridSize}
            formId={formId} shouldLabelObjects={shouldLabelObjects}/>;
    } else if (resolvedSchema instanceof z.ZodUnion) {
        return <Templates.UnionTemplate
            schema={resolvedSchema} name={name} props={props}
            gridWrap={gridWrap} sx={sx} gridSize={gridSize}
            formId={formId} shouldLabelObjects={shouldLabelObjects}/>;
    } else if (resolvedSchema instanceof z.ZodObject) {
        return <Templates.ObjectTemplate
            schema={resolvedSchema} name={name} props={props}
            gridWrap={gridWrap} sx={sx} gridSize={gridSize}
            formId={formId} shouldLabelObjects={shouldLabelObjects}/>;
    } else if (resolvedSchema instanceof z.ZodArray) {
        return <Templates.ArrayTemplate
            schema={resolvedSchema} name={name} props={props}
            gridWrap={gridWrap} sx={sx} gridSize={gridSize}
            formId={formId} shouldLabelObjects={shouldLabelObjects}/>;
    } else if (resolvedSchema instanceof z.ZodBoolean) {
        return <Templates.BooleanTemplate
            schema={resolvedSchema} name={name} props={props}
            gridWrap={gridWrap} sx={sx} gridSize={gridSize}
            formId={formId} shouldLabelObjects={shouldLabelObjects}/>;
    }

    return null;
};
