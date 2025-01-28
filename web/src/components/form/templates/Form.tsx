import React, {useEffect, useState} from "react";
import {z} from "zod";
import {Box, Button, Grid2} from "@mui/material";
import {RenderTemplate} from "./RenderTemplate";
import {mapToPrimaryType, resolveSchema} from "../utils";
import {FormRootProps} from "./types";
import {mergedFormsData, registerForm, status, submitForm} from '../../../state/form/slice'
import {useAppDispatch, useAppSelector} from '../../../state/hooks'
import {isEqual} from '../../../common/utils'

// Helper function to check if schema is an ObjectSchema
const isObjectSchema = (schema: z.ZodTypeAny): schema is z.ZodObject<any> => {
    return resolveSchema(schema) instanceof z.ZodObject || mapToPrimaryType(schema) instanceof z.ZodObject;
};

export const Form: React.FC<FormRootProps> = ({
    schema, initialData, labelObjects = false, columns = 1, id, submitData, submit
}) => {
    const [registered, setRegistered] = useState<boolean>(false)
    const [isValid, setIsValid] = useState<boolean>(false);
    const resolvedSchema = resolveSchema(schema);
    const dispatch = useAppDispatch();
    const formStatus = useAppSelector(status);
    const mergedData = useAppSelector(mergedFormsData);

    useEffect(() => {
        dispatch(registerForm({id, data: initialData || {}}))
        setRegistered(true);
    }, []);

    useEffect(() => {
        if (isEqual({}, mergedData))
            return;

        setIsValid(schema.safeParse(mergedData).success);
    }, [mergedData]);

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
            {(submitData || submit) && (<Box sx={{display: "flex", justifyContent: "flex-end"}}>
                <Button
                    variant="contained"
                    disabled={formStatus !== 'dirty' && isValid}
                    onClick={() => submitData ? dispatch(submitForm(submitData)) : submit && submit(submitData)}
                >Submit</Button>
            </Box>)}
        </form>}
    </>);
};
