import express, {type Router} from "express";

import {CreateLanguageSchema} from "./models";
import {validateRequest} from "@/common/utils/httpHandlers";
import {create, get} from "./controllers";
import {GetSchema} from "@/common/models/";

const router: Router = express.Router();

router.get("/", validateRequest(GetSchema), get);

router.post("/", validateRequest(CreateLanguageSchema), create);

export default router;