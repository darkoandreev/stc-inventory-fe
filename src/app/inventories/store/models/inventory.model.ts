export interface IInventory {
  id?: string;
  categoryId: string;
  inventoryNumber: number;
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
}

export interface IInventoriesResponse {
  result: IInventory[];
  total: number;
}
