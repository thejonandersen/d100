import {NextFunction, Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import type {ZodError, ZodSchema} from "zod";
import {z} from "zod";
import {parseZodSchema} from "zod-key-parser";

import {ServiceResponse} from "@/common/models/serviceResponse";

export const handleServiceResponse = (serviceResponse: ServiceResponse, response: Response) => {
    return response.send(serviceResponse);
};

export const validateRequest = (schema: ZodSchema, fieldSchema: any = null) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({body: req.body, query: req.query, params: req.params});
        if (fieldSchema && req.query?.fields) {
            const keys = Object.keys(parseZodSchema(fieldSchema).keys.body);
            const fields: string = req.query.fields as string;
            fields.split(",").every(field => {
                if (keys.includes(field))
                    return true;

                throw new z.ZodError([{
                    code: z.ZodIssueCode.custom,
                    path: ["fields"],
                    message: `field: ${field} not contained in selectable fields: ${keys.join(", ")}`,
                }]);
            });
        }


        next();
    } catch (err: any) {
        console.log("validation errors", err.issues);
        const errorMessage = `Invalid input: ${(err as ZodError).issues?.map((e) => {
            return `${e.path.join(".")} ${e.message}`;
        }).join(", ")}`;
        const statusCode = StatusCodes.BAD_REQUEST;
        res.status(StatusCodes.BAD_REQUEST);
        return handleServiceResponse({message: errorMessage}, res);
    }
};
