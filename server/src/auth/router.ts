import express, {type Router} from "express";

import {LoginSchema, RegisterSchema} from "@/auth/models";
import {validateRequest} from "@/common/utils/httpHandlers";
import {login, register} from "./controllers";

export const authRouter: Router = express.Router();

authRouter.post("/login", validateRequest(LoginSchema), login);

authRouter.post("/register", validateRequest(RegisterSchema), register);
