import {Request} from "express";
import {GetPrismaQuery} from "@/common/types";
import {GetQuery} from "@/common/models";

const createGetQuery = (req: Request): GetPrismaQuery => {
    const {limit, page, fields}: GetQuery = req.query;
    const query: GetPrismaQuery = {
        take: limit || 10,
        skip: !!limit && !!page ? (page - 1) * limit : 0,
    };

    if (fields) {
        const include = fields.split(",");
        query.select = include.reduce((acc: any, curr: string) => (acc[curr] = true, acc), {});
        query.select = {
            ...query.select,
            id: true,
        };
    }

    return query;
};

export default createGetQuery;