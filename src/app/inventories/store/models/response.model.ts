import { IInventory } from 'src/app/tab2/store/models/inventory.model';

export interface IResponse {
    message: string;
    error?: string;
    success: boolean;
    data?: IInventory;
}