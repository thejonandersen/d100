import cors from "cors";
import express, {type Express} from "express";
import passport from "passport";
import helmet from "helmet";
import {pino} from "pino";

import advantageRouter from "@/api/advantage/router";
import languageRouter from "@/api/language/router";
import raceRouter from "@/api/race/router";
import {userRouter} from "@/api/user/userRouter";
import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";
import {authRouter} from "@/auth/router";
import "./auth/passport";

const logger = pino({name: "server start"});
const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Routes
app.use(authRouter);
app.use(passport.authenticate("jwt", {session: false}));
app.use("/user", userRouter);
app.use("/race", raceRouter);
app.use("/language", languageRouter);
app.use("/advantage", advantageRouter);

// Error handlers
app.use(errorHandler());

export {app, logger};

//admin
//fh0GH2eYojUygUEa
