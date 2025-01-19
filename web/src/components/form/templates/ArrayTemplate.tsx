import React from "react";
import {z} from "zod";
import {Box, Button, capitalize, IconButton, InputLabel} from "@mui/material";
import {RenderTemplate} from "./RenderTemplate";
import {resolveSchema} from "../utils";
import {ArrayItemProps, ArrayTemplateProps} from "./types";
import IconResolver from "../../IconResolver";
import {getValue, updateFormData} from '../../../state/form/slice'
import {useAppDispatch, useAppSelector} from '../../../state/hooks'


// Ensure the inner schema is correctly typed
const getInnerSchema = (schema: z.ZodArray<any>): z.ZodTypeAny => {
    return schema.element;
};

// Array Item
const ArrayItem: React.FC<ArrayItemProps> = ({schema, name, gridSize, formId}) => {
    const resolvedSchema = resolveSchema(schema);
    const displayName: string = name ? name.split(".").pop() as string : "";
    return (<Box sx={{
        p: 2, border: "1px solid rgba(0,0,0,0.3)", borderRadius: "4px", minWidth: "100%"
    }}>
        <Box
            sx={{
                display: "flex", justifyContent: "space-between", pb: 1
            }}
        >
            <InputLabel>{capitalize(displayName.replace("s", ""))}:</InputLabel>
            <IconButton onClick={() => {
            }}>
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
export const ArrayTemplate: React.FC<ArrayTemplateProps> = ({schema, name, gridSize, formId, shouldLabelObjects}) => {
    const innerSchema = resolveSchema(getInnerSchema(schema)) as any;
    const path = `${formId}.${name}`;
    const values = useAppSelector((state) => getValue(state, path));
    const dispatch = useAppDispatch();
    const displayName: string = name ? name.split(".").pop() as string : "";
    const handleAdd = (e: any) => {
        dispatch(updateFormData({id: formId, path: `${path}[${[values.length]}]`, data: {}}));
    }
    if (innerSchema.description) {
        try {
            const template = JSON.parse(innerSchema.description).template;
            if (template) return (<RenderTemplate
                schema={innerSchema}
                name={name}
                gridSize={gridSize}
                formId={formId}
                shouldLabelObjects={shouldLabelObjects}
            />);
        } catch (e) {
            console.error(e);
        }
    }

    return (<>
        {values && values.map((_: any, index: number) => {
            return (<ArrayItem
                schema={innerSchema}
                name={`${name}[${index}]`}
                gridSize={gridSize}
                formId={formId}
                shouldLabelObjects={shouldLabelObjects}
                key={`${name}[${index}]`}
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
