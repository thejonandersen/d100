import { LoginForm } from "@/components/LoginForm"
import {login, LoginPayload} from "../state/user/slice";
import {useAppDispatch} from "../state/hooks";
import {FormEvent} from 'react'

interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
}

interface LoginFormElements extends HTMLFormElement {
    readonly elements: FormElements;
}

export default function Login() {
    const dispatch = useAppDispatch();

    const handler= (e: FormEvent<LoginFormElements>) => {
        e.preventDefault();
        const {email, password} = e.currentTarget.elements;
        dispatch(login({
            email: email.value,
            password: password.value,
        }));
    };

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm handleSubmit={handler} />
            </div>
        </div>
    )
}
