import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IResponse } from '../models/response.model';
import { ICategory } from '../models/category.model';
import { IInventoriesResponse, IInventory } from '../models/inventory.model';
import { IGetInventoriesParams } from '../models/get-inventories.param';

@Injectable({
  providedIn: 'root',
})
export class InventoriesService {
  constructor(private http: HttpClient) {}

  getInventories(
    params: IGetInventoriesParams
  ): Observable<IInventoriesResponse> {
    let httpParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      if (params[key] === null || params[key] === undefined) {
        return;
      }
      httpParams = httpParams.append(key, params[key]);
    });
    return this.http.get<IInventoriesResponse>(
      `${environment.API_URL}inventory`,
      {
        params: httpParams,
      }
    );
  }

  searchInventories(
    searchTerm: string,
    categoryId: string,
    isAmortization = false
  ): Observable<IInventory[]> {
    const params = {
      params: new HttpParams()
        .set('searchTerm', searchTerm)
        .set('categoryId', categoryId)
        .set('isAmortization', String(isAmortization)),
    };
    return this.http.get<IInventory[]>(
      `${environment.API_URL}inventory/search`,
      params
    );
  }

  deleteInventory(id: string): Observable<IResponse> {
    const params = {
      params: new HttpParams().set('id', id),
    };
    return this.http.delete<IResponse>(
      `${environment.API_URL}inventory`,
      params
    );
  }

  createNewItem(inventory: IInventory): Observable<IInventory> {
    return this.http.post<IInventory>(
      `${environment.API_URL}inventory`,
      inventory
    );
  }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${environment.API_URL}category`);
  }

  editInventory(inventory: IInventory): Observable<IResponse> {
    return this.http.put<IResponse>(
      `${environment.API_URL}inventory`,
      inventory
    );
  }

  getInventory(id: string): Observable<IInventory> {
    return this.http.get<IInventory>(`${environment.API_URL}inventory/${id}`);
  }

  uploadInventoryImage(file: Blob, imageName: string): Observable<any> {
    const form = new FormData();
    form.append('file', file, imageName);
    return this.http.post<any>(
      `${environment.API_URL}inventory/uploadFile`,
      form
    );
  }
}
