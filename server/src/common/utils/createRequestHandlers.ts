import type {Request, RequestHandler, Response} from "express";
import {PrismaClient} from "@prisma/client";
import {handleServiceResponse} from "@/common/utils/httpHandlers";
import {StatusCodes} from "http-status-codes";
import {capitalize} from "@/common/utils/index";
import {GetPrismaQuery} from "@/common/types";
import createGetQuery from "@/common/utils/createGetQuery";

const getConnection = (modelName: string) => {
    const prisma = new PrismaClient();
    const prismaHash = {
        "character": prisma.character,
        "race": prisma.race,
        "language": prisma.language,
        "advantage": prisma.advantage,
    };
    const {key} = {key: modelName} as { key: keyof typeof prismaHash };

    return prismaHash[key];
};

const createCreationRequestHandler = (modelName: string): RequestHandler => {
    return async (req: Request, res: Response) => {
        const data = req.body;
        const prismaConnection: any = getConnection(modelName);

        const existing = await prismaConnection.findFirst({
            where: {
                name: data.name,
            }
        });

        if (existing) {
            res.status(StatusCodes.BAD_REQUEST);
            return handleServiceResponse({
                message: `${capitalize(modelName)} already exists`
            }, res);
        }


        const record = await prismaConnection.create({
            data
        });

        return handleServiceResponse({
            message: `${capitalize(modelName)} created`,
            responseObject: record,
        }, res);
    };
};

const createGetRequestHandler = (modelName: string) => {
    return async (req: Request, res: Response) => {
        const query: GetPrismaQuery = createGetQuery(req);
        const prismaConnection: any = getConnection(modelName);

        try {
            const records = await prismaConnection.findMany(query);

            return handleServiceResponse({
                message: `${capitalize(modelName)}s`,
                responseObject: records
            }, res);
        } catch (e: any) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR);
            return handleServiceResponse({
                message: e.message,
            }, res);
        }
    };
};

const createGetByIdRequestHandler = (modelName: string): RequestHandler => {
    return async (req: Request, res: Response) => {
        const id = req.params.id;
        const connection = getConnection(modelName);
        // @ts-ignore
        const record = await connection.findUnique({
            where: {
                id
            }
        });

        if (!record) {
            res.status(StatusCodes.NOT_FOUND);
            return handleServiceResponse({
                message: `Race not found id: ${id}`
            }, res);
        }

        return handleServiceResponse({
            message: `${capitalize(modelName)}`,
            responseObject: record,
        }, res);
    };
};

const createUpdateRequestHandler = (modelName: string) => {
    return async (req: Request, res: Response) => {
        const data = req.body;
        const {id} = req.params;
        const connection = getConnection(modelName);

        console.log(id);

        try {
            // @ts-ignore
            const record = await connection.update({
                where: {
                    id,
                },
                data
            });

            return handleServiceResponse({
                message: `${capitalize(modelName)} updated`,
                responseObject: record,
            }, res);
        } catch (e: any) {
            console.log(e);
            res.status(StatusCodes.BAD_REQUEST);
            return handleServiceResponse({
                message: e.message
            }, res);
        }
    };
};

const createDeleteRequestHandler = (modelName: string) => {
    return async (req: Request, res: Response) => {
        const {id} = req.params;
        const connection = getConnection(modelName);

        try {
            // @ts-ignore
            const record = await connection.delete({
                where: {
                    id,
                }
            });

            return handleServiceResponse({
                message: `${capitalize(modelName)} deleted`,
                responseObject: record,
            }, res);
        } catch (e: any) {
            console.log(e);
            res.status(StatusCodes.BAD_REQUEST);
            return handleServiceResponse({
                message: e.message
            }, res);
        }
    };
};

const crud = (modelName: string) => {
    return {
        get: createGetRequestHandler(modelName),
        getById: createGetByIdRequestHandler(modelName),
        create: createCreationRequestHandler(modelName),
        update: createUpdateRequestHandler(modelName),
        remove: createDeleteRequestHandler(modelName),
    };
};

export {
    createCreationRequestHandler,
    createGetRequestHandler,
    createGetByIdRequestHandler,
    createDeleteRequestHandler,
    createUpdateRequestHandler
};

export default crud;