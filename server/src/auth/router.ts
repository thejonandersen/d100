import express, {type Router} from "express";

import {LoginRequestSchema, RegisterRequestSchema} from "d100-libs";
import {validateRequest} from "@/common/utils/httpHandlers";
import {login, register} from "./controllers";

export const authRouter: Router = express.Router();

authRouter.post("/login", validateRequest(LoginRequestSchema), login);

authRouter.post("/register", validateRequest(RegisterRequestSchema), register);
