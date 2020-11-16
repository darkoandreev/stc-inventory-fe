import { IInventory } from './inventory.model';

export interface IResponse {
    message: string;
    error?: string;
    success: boolean;
    data?: IInventory;
}