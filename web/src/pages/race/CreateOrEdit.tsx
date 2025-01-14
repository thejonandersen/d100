import React, {useEffect, useState} from 'react'
import {Alert, Card, CardHeader, Container, Skeleton, Zoom} from '@mui/material'
import {SubmitHandler} from 'react-hook-form'
import {API} from '../../common/axios'
import {CreateRaceSchema} from 'd100-libs'
import z from 'zod'
import {Form} from '../../components/form'
import {useParams} from 'react-router'

type Race = z.infer<typeof CreateRaceSchema>

export const CreateOrEditRace = () => {
    const [shouldRender, setShouldRender] = useState<boolean>(false)
    const [initialData, setInitialData] = useState<Race>()
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


    const handler: SubmitHandler<Race> = async (data: Race) => {
        try {
            delete data.id
            const response = await API.post(`race${id ? `/${id}`: ''}`, data);
            openMessages(`Race ${id ? 'updated':'created'}: ${data.name}`, 'success')
        } catch (e: any) {
            openMessages(e.message, 'error')
        }
    };

    const loadRace = async () => {
        try {
            const response = await API.get(`race/${id}`);
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

        loadRace();
    }, [id]);

    return (
        <Container maxWidth="sm">
            <Card className={"Card-Base"}>
                <CardHeader title={`${initialData ? "Edit": "Create New"} Race`}></CardHeader>
                {shouldRender ? (<Form
                    schema={CreateRaceSchema}
                    handler={handler}
                    api={API}
                    initialData={initialData}
                    debug
                    isSubMenu
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
