import express, {type Router} from "express";

import {CreateAdvantageSchema} from "./models";
import {validateRequest} from "@/common/utils/httpHandlers";
import {GetSchema} from "@/common/models/";
import crud from "@/common/utils/createRequestHandlers";

export const {get, getById, create, update, remove} = crud("advantage");


const router: Router = express.Router();

router.get("/", validateRequest(GetSchema), get);
router.get("/:id", validateRequest(GetSchema), getById);

router.post("/", validateRequest(CreateAdvantageSchema), create);
router.post("/:id", validateRequest(CreateAdvantageSchema), update);
router.delete("/:id", validateRequest(CreateAdvantageSchema), remove);

export default router;