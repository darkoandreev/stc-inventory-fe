import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IResponse } from '../models/response.model';
import { ICategory } from '../models/category.model';
import { IInventory } from '../models/inventory.model';

@Injectable({
    providedIn: 'root'
})
export class InventoriesService {
    constructor(private http: HttpClient) {}

    getInventories(categoryId: string, isAmortization: boolean): Observable<IInventory[]>{
        let params = new HttpParams();
        if (categoryId) {
            params = params.set('categoryId', categoryId)
                .set('isAmortization', `${isAmortization}`)
        }
        return this.http.get<IInventory[]>(`${environment.API_URL}inventory`, {params});
    }

    searchInventories(searchTerm: string, categoryId: string, isAmortization = false): Observable<IInventory[]> {
        const params = {
            params: new HttpParams().set('searchTerm', searchTerm).set('categoryId', categoryId).set('isAmortization', String(isAmortization))
        };
        return this.http.get<IInventory[]>(`${environment.API_URL}inventory/search`, params);
    }

    deleteInventory(id: string): Observable<IResponse> {
        const params = {
            params: new HttpParams().set('id', id)
        };
        return this.http.delete<IResponse>(`${environment.API_URL}inventory`, params);
    }

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