import React from 'react'
import {Alert, Card, CardHeader, Container, Skeleton, Zoom} from '@mui/material'
import {CreateAdvantageSchema} from 'd100-libs'
import {Form} from '../../components/form'
import {useParams} from 'react-router'
import {useAppDispatch} from '../../state/hooks'
import {useCreateOrEdit} from '../../hooks/useCreateOrEdit'

export const CreateOrEditAdvantage = () => {
    const {id} = useParams()
    const { shouldRender, message, initialData, severity } = useCreateOrEdit({id, schema: CreateAdvantageSchema, key: 'advantage'})
    const dispatch = useAppDispatch();

    return (
        <Container maxWidth="sm">
            {!message && (
                <Card className={"Card-Base"}>
                    <CardHeader title={`${initialData ? "Edit" : "Create New"} Advantage`}></CardHeader>
                    {shouldRender ? (<Form
                        schema={CreateAdvantageSchema}
                        initialData={initialData}
                        id="advantage"
                        submitData={{
                            keys: ['advantage'],
                            id,
                            url: 'advantage'
                        }}
                    />) : <>
                        <Skeleton/>
                        <Skeleton/>
                        <Skeleton/>
                        <Skeleton/>
                        <Skeleton/>
                    </>}

                </Card>
            )}
            <Zoom in={!!message}>
                <Alert severity={severity} sx={{mt: 5}}>{message}</Alert>
            </Zoom>
        </Container>
    )
}
