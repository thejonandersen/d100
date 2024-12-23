import type {Request, RequestHandler, Response} from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {PrismaClient} from "@prisma/client";
import {handleServiceResponse} from "@/common/utils/httpHandlers";
import {env} from "@/common/utils/envConfig";

const prisma = new PrismaClient();

export const register: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    const {email, password, confirmPassword, name} = req.body;
    const existingUser = await prisma.user.findUnique({
        where: {
            email: req.body.email,
        }
    });

    if (existingUser) {
        res.status(400);
        return handleServiceResponse({
            message: `User with ${req.body.email} already exists`,
            responseObject: null
        }, res);
    }

    if (password !== confirmPassword) {
        res.status(400);
        return handleServiceResponse({
            message: `Password and confirmation don't match`,
            responseObject: null
        }, res);
    }

    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const user = await prisma.user.create({
            data: {
                email,
                password: hash,
                name
            }
        });

        if (user) {
            return handleServiceResponse({
                message: "User created please log in",
                responseObject: null,
            }, res);
        }

    } catch (e) {
        res.status(500);
        return handleServiceResponse({
            message: "Server error",
            responseObject: null
        }, res);
    }


    return res;
};

export const login: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    const {email, password} = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        res.status(403);
        return handleServiceResponse({
            message: `User not found`,
            responseObject: null
        }, res);
    }

    if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign(
            {
                id: user.id
            },
            env.JWT_SECRET,
            {expiresIn: "1d"}
        );

        // @ts-ignore
        delete user.password;
        return handleServiceResponse({
            message: "Login success",
            responseObject: {
                token,
                user
            },
        }, res);
    }

    res.status(403);
    return handleServiceResponse({
        message: `Email and password don't match`,
        responseObject: null
    }, res);
};