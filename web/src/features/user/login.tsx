import React from "react";
import {login, LoginPayload} from "./slice";
import {useAppDispatch} from "../../app/hooks";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Button, Card, CardActions, CardHeader, Container, Stack, TextField} from "@mui/material";
import "../../App.css";

export const Login: React.FC = () => {
    const {
        handleSubmit,
        formState: {errors, isValid, isSubmitting},
        control,
    } = useForm<LoginPayload>({mode: "onBlur"});

    const dispatch = useAppDispatch();

    const handler: SubmitHandler<LoginPayload> = (data: LoginPayload) => {
        console.log({data});
        dispatch(login(data));
    };
    return (<Container maxWidth="sm">
        <Card className={"Card-Base"}>
            <CardHeader title="Log In"></CardHeader>
            <form onSubmit={handleSubmit(handler)}>
                <Stack spacing={4}>
                    <Controller
                        name="email"
                        defaultValue={""}
                        control={control}
                        rules={{required: "Email is required"}}
                        render={({field}: any) => (
                            <TextField
                                {...field}
                                label="Email"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        defaultValue={""}
                        control={control}
                        rules={{required: "Password is required"}}
                        render={({field}: any) => (
                            <TextField
                                {...field}
                                label="Password"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                variant="outlined"
                                fullWidth
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
    </Container>);
};

export {};