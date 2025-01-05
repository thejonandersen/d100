import axios from "axios";
import {API_URI} from "./environment";
import z from "zod";

const ErrorResponseSchema = z.object({
    type: z.string().min(1),
    messages: z.record(z.string(), z.string()),
    stack: z.array(z.string()),
    cause: z.record(z.string().min(1), z.any()).optional()
});

export const API = axios.create({
    baseURL: API_URI,
    maxContentLength: 30 * 1024 * 1024,
    maxBodyLength: 30 * 1024 * 1024,
    headers: {
        "Content-Type": "application/json"
    }
});

API.interceptors.request.use(config => {
    let token;

    if (
        !config.headers["authorization"] &&
        (token = localStorage.getItem("token"))
    ) {
        config.headers["authorization"] = `Bearer ${token}`;
    }

    return config;
});

API.interceptors.response.use(response => {
    console.log(response.data.message);
    return response.data.responseObject;
}, error => {
    throw new Error(error.response.data.message);
});
