import React, {useEffect, useState} from 'react'
import {Alert, Card, CardHeader, Container, Skeleton, Zoom} from '@mui/material'
import {CreateAdvantageSchema} from 'd100-libs'
import {Form} from '../../components/form'
import {useParams} from 'react-router'
import {byId as advantageById, load as loadAdvantages} from '../../state/advantage/slice';
import {useAppDispatch, useAppSelector} from '../../state/hooks'

export const CreateOrEditAdvantage = () => {
    const [shouldRender, setShouldRender] = useState<boolean>(false)
    const [message, setMessage] = useState<string | null>(null)
    const [severity, setSeverity] = useState<any>()
    const {id} = useParams()
    const initialData = useAppSelector(state => advantageById(state, id));
    const dispatch = useAppDispatch();


    const clearMessages = (e: React.FocusEvent<HTMLInputElement>) => {
        setSeverity('')
        setMessage(null);
    }

    const openMessages = (text: string, style: string) => {
        setMessage(text);
        setSeverity(style);

        setTimeout(clearMessages, 2000)
    }


    useEffect(() => {
        if (!id) {
            setShouldRender(true)
            return
        }

        if (id && !initialData) {
            dispatch(loadAdvantages())
        }

        if (initialData) {
            setShouldRender(true)
        }
    }, [id, initialData]);

    return (
        <Container maxWidth="sm">
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
            <Zoom in={!!severity}>
                <Alert severity={severity} sx={{mt: 5}}>{message}</Alert>
            </Zoom>
        </Container>
    )
}
