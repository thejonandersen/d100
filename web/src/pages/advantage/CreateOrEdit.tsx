import React, {useEffect, useState} from 'react'
import {Alert, Card, CardHeader, Container, Skeleton, Zoom} from '@mui/material'
import {SubmitHandler} from 'react-hook-form'
import {API} from '../../common/axios'
import {CreateAdvantageSchema} from 'd100-libs'
import z from 'zod'
import {Form} from '../../components/form'
import {useParams} from 'react-router'
import {removeEmpty} from '../../components/form/utils'

type Advantage = z.infer<typeof CreateAdvantageSchema>

export const CreateOrEditAdvantage = () => {
    const [shouldRender, setShouldRender] = useState<boolean>(false)
    const [initialData, setInitialData] = useState<Advantage>()
    const [message, setMessage] = useState<string | null>(null)
    const [severity, setSeverity] = useState<any>()
    const {id} = useParams()


    const clearMessages = (e: React.FocusEvent<HTMLInputElement>) => {
        setSeverity('')
        setMessage(null);
    }

    const openMessages = (text: string, style: string) => {
        setMessage(text);
        setSeverity(style);

        setTimeout(clearMessages, 2000)
    }


    const handler: SubmitHandler<Advantage> = async (data: Advantage) => {
        try {
            delete data.id
            const response = await API.post(`advantage${id ? `/${id}`: ''}`, data);
            openMessages(`Advantage ${id ? 'updated':'created'}: ${data.name}`, 'success')
        } catch (e: any) {
            openMessages(e.message, 'error')
        }
    };

    const loadAdvantage = async () => {
        try {
            const response = await API.get(`advantage/${id}`);
            setInitialData(response);
        } catch (e) {

        }
    }

    useEffect(() => {
        if (initialData) {
            setShouldRender(true);
        }
    }, [initialData]);

    useEffect(() => {
        if (!id) {
            setShouldRender(true)
            return
        }

        loadAdvantage();
    }, [id]);

    return (
        <Container maxWidth="sm">
            <Card className={"Card-Base"}>
                <CardHeader title={`${initialData ? "Edit": "Create New"} Advantage`}></CardHeader>
                {shouldRender ? (<Form
                    schema={CreateAdvantageSchema}
                    handler={handler}
                    api={API}
                    initialData={initialData}
                    debug
                />) : <>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </>}

            </Card>
            <Zoom in={!!severity}>
                <Alert severity={severity} sx={{mt: 5}}>{message}</Alert>
            </Zoom>
        </Container>
    )
}
