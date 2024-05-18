import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { Request, Response } from "express";
//All routes import
import { productRouter } from "./routes/v1/product.routes";
import { categoryRouter } from "./routes/v1/category.routes";
import { subCategoryRouter } from "./routes/v1/subcategory.routes";
import { authRouter } from "./routes/v1/authRoutes.routes";
import { request } from "http";
import { userRouter } from "./routes/v1/users.routes";

const app = express();
app.use(cors());
app.use(express.json());

/**
 * Environment PORT config
 */
const PORT = process.env.PORT || 3001;

/**
 * Routes
 */
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/subcategories", subCategoryRouter);

app.use((req: Request, res: Response) => {
  res.status(404).send("404 - No se encuentra la ruta especificada");
});
/**
 * Listen App
 */
app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
