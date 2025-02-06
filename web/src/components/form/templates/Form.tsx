import React, {createContext} from "react";
import {z} from "zod";
import {Box, Button, Grid2} from "@mui/material";
import {RenderTemplate} from "./RenderTemplate";
import {mapToPrimaryType, resolveSchema} from "../utils";
import {FormRootProps} from "./types";
import useForm from '../useForm'
import {Conditions, RegisterConditionParams} from '../useFormConditions'

// Helper function to check if schema is an ObjectSchema
const isObjectSchema = (schema: z.ZodTypeAny): schema is z.ZodObject<any> => {
    return resolveSchema(schema) instanceof z.ZodObject || mapToPrimaryType(schema) instanceof z.ZodObject;
};

type FormContext = {
    initialData?: any;
    labelObjects: boolean;
    columns: number;
    displayText?: {
        [key: string]: string;
    },
    gridSize: number;
    registerConditions: (props: RegisterConditionParams[]) =>string[];
    conditions: Conditions;
}

export const FormContext = createContext<FormContext>({
    labelObjects: false,
    columns: 1,
    gridSize: 12,
    registerConditions: (props: RegisterConditionParams[]) => [],
    conditions: {},
})

export const Form: React.FC<FormRootProps> = ({
    schema, initialData, labelObjects = false, columns = 1, id, submitData, submit, displayText
}) => {
    const {registered, isValid, registerConditions, conditions, formStatus, submitClickHandler} = useForm({id, submitData, submit, initialData, schema})
    const resolvedSchema = resolveSchema(schema);

    return (<>
        {registered && <FormContext.Provider value={{
            initialData,
            labelObjects,
            columns,
            displayText,
            registerConditions,
            gridSize: 12 / columns,
            conditions,
        }}>
            <form>
                <Grid2 spacing={2} container>
                    {isObjectSchema(resolvedSchema) && Object.keys(resolvedSchema.shape).map((key) => {
                        return (<RenderTemplate
                            key={key}
                            schema={resolvedSchema.shape[key]}
                            name={key}
                            formId={id}
                        />);
                    })}
                </Grid2>
                {submitClickHandler && (<Box sx={{display: "flex", justifyContent: "flex-end"}}>
                    <Button
                        variant="contained"
                        disabled={formStatus !== 'dirty' && isValid}
                        onClick={() => submitClickHandler}
                    >Submit</Button>
                </Box>)}
            </form>
        </FormContext.Provider>}
    </>);
};
