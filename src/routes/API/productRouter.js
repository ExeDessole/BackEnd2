import { Router } from "express";
import { createProduct, getProducts } from "../../controlers/productController.js";

const productRouter = Router();

productRouter.post("/product", createProduct);
productRouter.get("/product", getProducts);
export default productRouter;