import type {Request, RequestHandler, Response} from "express";
import {PrismaClient} from "@prisma/client";
import {handleServiceResponse} from "@/common/utils/httpHandlers";

const prisma = new PrismaClient();

class UserController {
    public getUsers: RequestHandler = async (_req: Request, res: Response) => {
        const serviceResponse = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
            }
        });
        return handleServiceResponse({
            message: "All users",
            responseObject: serviceResponse,
        }, res);
    };

    public getUser: RequestHandler = async (req: Request, res: Response) => {
        const id = req.params.id;
        const serviceResponse = await prisma.user.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
            }
        });
        return handleServiceResponse({
            message: "User by Id",
            responseObject: serviceResponse,
        }, res);
    };
}

export const userController = new UserController();
