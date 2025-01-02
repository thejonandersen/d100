import express, {type Router} from "express";

import {CreateRaceSchema, UpdateRaceSchema} from "./models";
import {validateRequest} from "@/common/utils/httpHandlers";
import {create, get, getById, update} from "./controllers";
import {GetByIdSchema, GetSchema} from "@/common/models";

const router: Router = express.Router();

router.get("/", validateRequest(GetSchema, CreateRaceSchema), get);

router.get("/:id", validateRequest(GetByIdSchema), getById);

router.post("/", validateRequest(CreateRaceSchema), create);

router.post("/:id", validateRequest(UpdateRaceSchema), update);

export default router;