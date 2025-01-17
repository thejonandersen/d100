import React, {useEffect, useState} from 'react'
import {Alert, Card, CardHeader, Container, Skeleton, Zoom} from '@mui/material'
import {SubmitHandler} from 'react-hook-form'
import {API} from '../../common/axios'
import {CreateAdvantageSchema} from 'd100-libs'
import z from 'zod'
import {Form} from '../../components/form'
import {useParams} from 'react-router'
import {Advantage, advantageById, loadAdvantages, updateAdvantage, createAdvantage} from '../../state/advantages/slice';
import {useAppSelector, useAppDispatch} from '../../state/hooks'

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


    const handler: SubmitHandler<Advantage> = async (data: Advantage) => {
        try {
            if (id) {
                await dispatch(updateAdvantage({id, data}));
            } else {
                await dispatch(createAdvantage({ data }))
            }

            openMessages(`Advantage ${id ? 'updated':'created'}: ${data.name}`, 'success')
        } catch (e: any) {
            openMessages(e.message, 'error')
        }
    };

    useEffect(() => {
        if (!initialData && id) {
            dispatch(loadAdvantages())
            return
        }

        setShouldRender(true)

    }, [initialData]);

    return (
        <Container maxWidth="sm">
            <Card className={"Card-Base"}>
                <CardHeader title={`${initialData ? "Edit": "Create New"} Advantage`}></CardHeader>
                {shouldRender ? (<Form
                    schema={CreateAdvantageSchema}
                    api={API}
                    initialData={initialData}
                    id="advantages"
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
