import express, {type Router} from "express";

import {CreateAdvantageRequestSchema, UpdateAdvantageRequestSchema} from "d100-libs";
import {validateRequest} from "@/common/utils/httpHandlers";
import {GetSchema, GetByIdSchema} from "@/common/models/";
import crud from "@/common/utils/createRequestHandlers";

export const {get, getById, create, update, remove} = crud("advantage");


const router: Router = express.Router();

router.get("/", validateRequest(GetSchema), get);
router.get("/:id", validateRequest(GetByIdSchema), getById);

router.post("/", validateRequest(CreateAdvantageRequestSchema), create);
router.post("/:id", validateRequest(UpdateAdvantageRequestSchema), update);
router.delete("/:id", validateRequest(GetByIdSchema), remove);

export default router;
