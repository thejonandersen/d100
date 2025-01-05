import React, {useState} from 'react'
import {Button, Card, CardActions, CardHeader, Container, Stack, TextField, Alert, Zoom} from '@mui/material'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import {API} from '../common/axios'
import {zodResolver} from '@hookform/resolvers/zod'
import {Language as LanguageType, CreateLanguageSchema} from 'd100-libs'


export const Language = () => {
    const [message, setMessage] = useState<string|null>(null)
    const [severity, setSeverity] = useState<any>()
    const {
        handleSubmit,
        formState: {errors, isValid, isSubmitting},
        control,
        resetField,
    } = useForm<LanguageType>({resolver: zodResolver(CreateLanguageSchema)});

    const clearMessages = (e: React.FocusEvent<HTMLInputElement>) => {
        resetField('name');
        setSeverity('')
        setMessage(null);
    }

    const openMessages = (text: string, style: string) => {
        setMessage(text);
        setSeverity(style);

        setTimeout(() => {
            setSeverity('')
            setMessage(null);
        }, 2000)
    }


    const handler: SubmitHandler<LanguageType> = async (data: LanguageType) => {
        try {
            const response = await API.post('language', data);
            openMessages(`Language created: ${data.name}`, 'success')
        } catch (e: any) {
            openMessages(e.message, 'error')
        }
    };

    return (
      <Container maxWidth="sm">
          <Card className={"Card-Base"}>
              <CardHeader title="Create New Language"></CardHeader>
              <form onSubmit={handleSubmit(handler)}>
                  <Stack spacing={4}>
                      <Controller
                          name="name"
                          defaultValue={""}
                          control={control}
                          rules={{required: "Name is required"}}
                          render={({field}: any) => (
                              <TextField
                                  {...field}
                                  label="Name"
                                  error={!!errors.name}
                                  helperText={errors.name?.message}
                                  variant="outlined"
                                  fullWidth
                                  onFocus={clearMessages}
                              />
                          )}
                      />
                      <CardActions sx={{flexDirection: "row-reverse"}}>
                          <Button
                              variant="contained"
                              type="submit"
                              disabled={!isValid || isSubmitting}
                          >Submit</Button>
                      </CardActions>
                  </Stack>
              </form>
          </Card>
          <Zoom in={!!severity}>
              <Alert severity={severity} sx={{mt: 5}}>{message}</Alert>
          </Zoom>
      </Container>
  )
}
