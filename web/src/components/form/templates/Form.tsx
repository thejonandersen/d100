import React, {useEffect, useState} from "react";
import {z} from "zod";
import {Box, Button, Grid2} from "@mui/material";
import {RenderTemplate} from "./RenderTemplate";
import {mapToPrimaryType, resolveSchema} from "../utils";
import {FormRootProps} from "./types";
import {isValid, registerForm, status, submitForm} from '../../../state/form/slice'
import {useAppDispatch, useAppSelector} from '../../../state/hooks'

// Helper function to check if schema is an ObjectSchema
const isObjectSchema = (schema: z.ZodTypeAny): schema is z.ZodObject<any> => {
    return resolveSchema(schema) instanceof z.ZodObject || mapToPrimaryType(schema) instanceof z.ZodObject;
};

export const Form: React.FC<FormRootProps> = ({
    schema, initialData, labelObjects = false, columns = 1, id, submitData
}) => {
    const [registered, setRegistered] = useState<boolean>(false)
    const resolvedSchema = resolveSchema(schema);
    const dispatch = useAppDispatch();
    const formStatus = useAppSelector(status);
    const valid = useAppSelector((state) => isValid(state, schema, id));

    useEffect(() => {
        dispatch(registerForm({id, data: initialData || {}}))
        setRegistered(true);
    }, []);

    return (<>
        {registered && <form>
            <Grid2 spacing={2} container>
                {isObjectSchema(resolvedSchema) && Object.keys(resolvedSchema.shape).map((key) => {
                    return (<RenderTemplate
                        key={key}
                        schema={resolvedSchema.shape[key]}
                        name={key}
                        gridWrap={true}
                        gridSize={12 / columns}
                        formId={id}
                        shouldLabelObjects={labelObjects}
                    />);
                })}
            </Grid2>
            {submitData && (<Box sx={{display: "flex", justifyContent: "flex-end"}}>
                <Button
                    variant="contained"
                    disabled={formStatus !== 'dirty' && valid}
                    onClick={() => dispatch(submitForm(submitData))}
                >Submit</Button>
            </Box>)}
        </form>}
    </>);
};
