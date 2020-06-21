import { Router, Application } from "https://deno.land/x/oak/mod.ts";
import {
  createLabelController,
  updateLabelController,
} from "../controller/index.ts";
import {
  authAccessMiddleware,
} from "../../../middlewares/is-auth.ts";

const labelRoute = (app: Application) => {
  const router = new Router();
  router
    .post("/labels", authAccessMiddleware, createLabelController)
    .patch("/labels/:labelId", authAccessMiddleware, updateLabelController);

  app.use(router.routes());
  app.use(router.allowedMethods());
};

export { labelRoute };
