import { ICategory } from './category.model';
import { InventoryTechnique } from './inventory-technique.model';

export interface IInventory {
  id?: string;
  inventoryTech: InventoryTechnique;
  name: string;
  amount: number;
  location: string;
  imageName: string;
  responsiblePerson: string;
  growth: number;
  buyDate: Date;
  description: string;
  quantity: number;
  isValid: boolean;
  isAmortization: boolean;
  category: ICategory;
}

export interface IInventoriesResponse {
  result: IInventory[];
  total: number;
}
