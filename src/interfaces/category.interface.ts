import { SubCategory } from "./subcategory.interface";

export interface Category {
  id: number;
  name: string;
  description: string;
  subCategoryId: SubCategory[];
}
