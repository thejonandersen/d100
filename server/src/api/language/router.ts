import express, {type Router} from "express";

import {CreateLanguageRequestSchema} from "d100-libs";
import {validateRequest} from "@/common/utils/httpHandlers";
import {create, get} from "./controllers";
import {GetSchema} from "@/common/models/";

const router: Router = express.Router();

router.get("/", validateRequest(GetSchema), get);

router.post("/", validateRequest(CreateLanguageRequestSchema), create);

export default router;
