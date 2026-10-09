import { Router } from "express";
import { registerUser, loginUser, logoutUser, me, refresh } from "./auth.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", me);
router.post("/refresh", refresh);

export default router;