import express from "express"
import { deleteUser, getAllUser, getUser, loginUser, registerUser, updateUser } from "../controllers/user.js"
import { verifyAdmin } from "./verifyToken.js";


const router = express.Router();


router.post("/register", registerUser),
router.post("/login", loginUser)
router.put("/update/:id",verifyAdmin, updateUser)
router.delete("/delete",verifyAdmin, deleteUser)
router.get("/users",verifyAdmin, getAllUser)
router.put("/find/user/:id",verifyAdmin, getUser)

export default router