import { SubCategory } from "./subcategory.interface.js";

export interface Category {
  id: number;
  name: string;
  description: string;
  subCategoryId: SubCategory[];
}
