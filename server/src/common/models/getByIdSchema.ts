import {z} from "zod";
import {withObjectIdValidation} from "@/common/utils/validators";

// Input Validation for 'GET users/:id' endpoint
const GetByIdSchema = withObjectIdValidation(z.object({
    params: z.object({id: z.string()}),
}));

export default GetByIdSchema;
