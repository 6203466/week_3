import { Router } from "express";
import { registerUser, loginUser, logoutUser, me } from "./auth.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", me);

export default router;