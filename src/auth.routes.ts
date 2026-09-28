import { Router } from "express";
import { registerUser, loginUser } from "./auth.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// middleware for auth will go here



export default router;