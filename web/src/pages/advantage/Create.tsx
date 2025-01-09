import React, {useState} from 'react'
import {Card, CardHeader, Container, Alert, Zoom} from '@mui/material'
import {SubmitHandler} from 'react-hook-form'
import {API} from '../../common/axios'
import {CreateAdvantageSchema} from 'd100-libs'
import z from 'zod'
import {Form} from '../../components/form'

type Advantage = z.infer<typeof CreateAdvantageSchema>

export const CreateAdvantage = () => {
    const [message, setMessage] = useState<string|null>(null)
    const [severity, setSeverity] = useState<any>()


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
            const response = await API.post('advantage', data);
            openMessages(`Language created: ${data.name}`, 'success')
        } catch (e: any) {
            openMessages(e.message, 'error')
        }
    };

    return (
        <Container maxWidth="sm">
            <Card className={"Card-Base"}>
                <CardHeader title="Create New Advantage"></CardHeader>
                <Form
                    schema={CreateAdvantageSchema}
                    onSubmit={handler}
                    api={API}
                />
            </Card>
            <Zoom in={!!severity}>
                <Alert severity={severity} sx={{mt: 5}}>{message}</Alert>
            </Zoom>
        </Container>
    )
}
