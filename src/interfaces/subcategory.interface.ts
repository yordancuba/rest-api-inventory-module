import { Product } from "./product.interface.js";

export interface SubCategory {
  id: number;
  name: string;
  description?: string;
  categoryId: number;
  products: Product[];
}
