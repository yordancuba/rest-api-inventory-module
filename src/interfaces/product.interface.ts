import { ImageUrl } from "./imageUrl.interfaces.js";

export interface Product {
  id?: number;
  name: string;
  price: number;
  code: string;
  description?: string;
  subCategoryId: number;
  imageUrl: ImageUrl[];
}

export interface ProductAdd {
  name: string;
  price: number;
  code: string;
  subCategoryId: number;
}
