export interface IInventory {
    id?: string;
    categoryId: string;
    inventoryNumber: number;
    name: string;
    amount: number;
    location: string;
    imageUrl: string;
    responsiblePerson: string;
    growth: number;
    buyedAt: string
    description: string;
    quantity: number;
    isValid: boolean;
    isAmortization: boolean;
}