import express, {type Router} from "express";

import {CreatePowerRequestSchema, UpdatePowerRequestSchema} from "d100-libs";
import {validateRequest} from "@/common/utils/httpHandlers";
import {GetSchema, GetByIdSchema} from "@/common/models/";
import crud from "@/common/utils/createRequestHandlers";

export const {get, getById, create, update, remove} = crud("power");


const router: Router = express.Router();

router.get("/", validateRequest(GetSchema), get);
router.get("/:id", validateRequest(GetByIdSchema), getById);

router.post("/", validateRequest(CreatePowerRequestSchema), create);
router.post("/:id", validateRequest(UpdatePowerRequestSchema), update);
router.delete("/:id", validateRequest(GetByIdSchema), remove);

export default router;
