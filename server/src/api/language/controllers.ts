import type {RequestHandler} from "express";
import {createCreationRequestHandler, createGetRequestHandler} from "@/common/utils/createRequestHandlers";

export const get: RequestHandler = createGetRequestHandler("language");

export const create: RequestHandler = createCreationRequestHandler("language");