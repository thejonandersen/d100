import React from "react";
import {login, LoginPayload} from "../state/user/slice";
import {useAppDispatch} from "../state/hooks";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {
    Button,
    Card,
    CardActions,
    CardHeader,
    Container,
    Stack,
    TextField,
    InputAdornment,
    IconButton,
    OutlinedInput, FormControl, InputLabel
} from "@mui/material";
import "../App.css";
import IconResolver from '../components/IconResolver'

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

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
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
                            <FormControl>
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    {...field}
                                    label="Password"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    variant="outlined"
                                    type={showPassword ? 'text' : 'password'}
                                    fullWidth
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                onMouseUp={handleMouseUpPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <IconResolver iconName="VisibilityOff" /> : <IconResolver iconName="Visibility" />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
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
