import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { Request, Response } from "express";
//All routes import
import { productRouter } from "./routes/v1/product.routes.js";
import { categoryRouter } from "./routes/v1/category.routes.js";
import { subCategoryRouter } from "./routes/v1/subcategory.routes.js";
import { authRouter } from "./routes/v1/authRoutes.routes.js";
import { userRouter } from "./routes/v1/users.routes.js";
import { imageUrlRouter } from "./routes/v1/imageUrl.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors());
app.disable("x-powered-by");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Environment PORT config
 */
const PORT = process.env.PORT;

/**
 * Routes
 */
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/subcategories", subCategoryRouter);
app.use("/api/v1/images", imageUrlRouter);

app.use((req: Request, res: Response) => {
  res.status(404).send("404 - No se encuentra la ruta especificada");
});
/**
 * Listen App
 */
app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
