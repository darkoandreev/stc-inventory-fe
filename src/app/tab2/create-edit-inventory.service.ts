import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory } from './store/models/category.model';
import { IInventory } from './store/models/inventory.model';
import { IResponse } from '../inventories/store/models/response.model';

@Injectable({
    providedIn: 'root'
})
export class CreateEditInventoryService {
    constructor(private http: HttpClient) {}  
      
    createNewItem(inventory: IInventory): Observable<IInventory>{
        return this.http.post<IInventory>(`${environment.API_URL}inventory`, inventory);
    }

    getCategories(): Observable<ICategory[]>{
        return this.http.get<ICategory[]>(`${environment.API_URL}category`);
    }

    editInventory(inventory: IInventory): Observable<IResponse>{
        return this.http.put<IResponse>(`${environment.API_URL}inventory`, inventory);
    }

    getInventory(id: string): Observable<IInventory>{
        return this.http.get<IInventory>(`${environment.API_URL}inventory/${id}`);
    }
}   