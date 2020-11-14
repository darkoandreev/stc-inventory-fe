import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { IInventory } from '../tab2/store/models/inventory.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
}   