import {Request} from "express";
import {GetPrismaQuery} from "@/common/types";
import {GetQuery} from "@/common/models";

const parseFieldsOrInclude = (fields: string)=> fields.split(',').reduce((acc: any, curr: string) => acc[curr] = true, {});

const createGetQuery = (req: Request): GetPrismaQuery => {
    const {limit, page, fields, include}: GetQuery = req.query;
    const query: GetPrismaQuery = {
        take: limit || 10,
        skip: !!limit && !!page ? (page - 1) * limit : 0,
    };

    if (fields) {
        const selectFields = fields.split(",");
        query.select =
        query.select = {
            ...parseFieldsOrInclude(fields),
            id: true,
        };
    }

    if (include) {
        query.include = parseFieldsOrInclude(include)
    }

    return query;
};

export default createGetQuery;
