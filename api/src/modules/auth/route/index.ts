import { Router, Application } from "https://deno.land/x/oak/mod.ts";
import {
  registerController,
  loginController,
  changePasswordController,
  getCurrentUserController,
  refreshTokenController,
  revokeTokenController,
  forceLogoutController,
} from "../controller/index.ts";
import { authAccessMiddleware, authRefreshMiddleware } from "../../../middlewares/is-auth.ts";

const authRoute = (app: Application) => {
    const router = new Router();
    router
      .post("/auth/login", loginController)
      .post("/auth/register", registerController)
      .get("/auth/forgot-password", (context) => {
        context.response.body = "It's work!";
      })
      .post("/auth/change-password", changePasswordController)
      .get("/auth/revoke-token", authRefreshMiddleware, revokeTokenController)
      .get("/auth/refresh-token", authRefreshMiddleware, refreshTokenController)
      .get("/auth/force-logout", authRefreshMiddleware, forceLogoutController)
      .get("/auth/user", authAccessMiddleware, getCurrentUserController);
    
    app.use(router.routes());
    app.use(router.allowedMethods());
};

export {
    authRoute
};