import {ObjectId} from "mongodb";
import {ZodObject} from "zod";

export const withObjectIdValidation = (schema: ZodObject<any>) =>
    schema.refine((data) => {
        let id;
        try {
            id = new ObjectId(data?.params?.id).toString();
        } catch (e) {
            return false;
        }

        return data?.params?.id === id;
    }, {
        message: "Invalid id"
    });