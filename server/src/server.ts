import cors from "cors";
import express, {type Express} from "express";
import passport from "passport";
import helmet from "helmet";
import {pino} from "pino";

import {userRouter} from "@/api/user/userRouter";
import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";
import {env} from "@/common/utils/envConfig";
import {authRouter} from "@/auth/router";
import "./api/auth/passport";

const logger = pino({name: "server start"});
const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: env.CORS_ORIGIN, credentials: true}));
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Routes
app.use(authRouter);
app.use(passport.authenticate("jwt", {session: false}));
app.use("/users", userRouter);

// Error handlers
app.use(errorHandler());

export {app, logger};

//admin
//fh0GH2eYojUygUEa
