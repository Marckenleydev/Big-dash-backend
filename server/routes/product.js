import express from "express"

import { createProduct, deleteProduct, getAllProduct, getProduct, updateProduct } from "../controllers/product.js";
import { verifyAdmin } from "./verifyToken.js";

const router = express.Router();


router.post("/create",verifyAdmin, createProduct),
router.put("/update/:id",verifyAdmin, updateProduct)
router.delete("/delete/:id",verifyAdmin, deleteProduct)
router.get("/products", getAllProduct)
router.get("/find/product/:id",verifyAdmin, getProduct)

export default router