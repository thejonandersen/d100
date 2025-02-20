import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import z from "zod";
import {API} from "../../common/axios";

export type User = {
    id: String;
    name: String;
    email: String;
}

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export type LoginPayload = z.infer<typeof loginSchema>

export interface UserState {
    token: String | null;
    current: User | null;
    status: "loading" | "idle" | "failed";
}

const token = localStorage.getItem("token") || null;
const unparsed = localStorage.getItem("user");
const current: User | null = unparsed ? JSON.parse(unparsed) : null;

const initialState: UserState = {
    token,
    current,
    status: "idle",
};

export const login = createAsyncThunk(
    "user/login",
    async ({email, password}: LoginPayload, thunkAPI) => {
        try {
            const response: any = await API.post("login", {email, password});
            console.log({response});
            return response;
        } catch (e: any) {
            console.error(e.message);
            return Promise.reject()
        }
    });

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: state => {
            localStorage.setItem("token", "");
            localStorage.setItem("user", "");
            state.token = null;
            state.current = null;
        },
        newToken: (state, payload: any) => {
            localStorage.setItem('token', payload.token);
            state.token = payload.token;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(login.pending, (state) => {
                state.status = "loading";
                console.log({state});
            })
            .addCase(login.fulfilled, (state, action) => {
                console.log({action});

                const {user, token} = action?.payload;

                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", token);

                return {
                    status: "idle",
                    current: user,
                    token,
                };
            })
            .addCase(login.rejected, (state) => {
                state.status = "failed";
            });
    }
});

export const {logout, newToken} = userSlice.actions;

export default userSlice.reducer;
