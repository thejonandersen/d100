import express, {type Router} from "express";

import {CreateRaceRequestSchema, UpdateRaceRequestSchema} from "d100-libs";
import {validateRequest} from "@/common/utils/httpHandlers";
import {create, get, getById, update} from "./controllers";
import {GetByIdSchema, GetSchema} from "@/common/models";

const router: Router = express.Router();

router.get("/", validateRequest(GetSchema, CreateRaceRequestSchema), get);

router.get("/:id", validateRequest(GetByIdSchema), getById);

router.post("/", validateRequest(CreateRaceRequestSchema), create);

router.post("/:id", validateRequest(UpdateRaceRequestSchema), update);

export default router;
