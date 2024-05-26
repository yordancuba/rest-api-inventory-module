import { Product } from "./product.interface";

export interface SubCategory {
  id: number;
  name: string;
  description?: string;
  categoryId: number;
  products: Product[];
}
