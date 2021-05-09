import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IResponse } from '../models/response.model';
import { ICategory } from '../models/category.model';
import { IInventoriesResponse, IInventory } from '../models/inventory.model';
import { IGetInventoriesParams } from '../models/get-inventories.param';
import { ISearchInventoriesParams } from '../models/search-inventories.params';

@Injectable({
  providedIn: 'root',
})
export class InventoriesService {
  constructor(private http: HttpClient) {}

  getInventories(params: IGetInventoriesParams): Observable<IInventory[]> {
    return this.http.get<IInventory[]>(`${environment.API_URL}inventory`, {
      params: this.generateParams(params),
    });
  }

  searchInventories(
    params: ISearchInventoriesParams
  ): Observable<IInventory[]> {
    return this.http.get<IInventory[]>(
      `${environment.API_URL}inventory/search`,
      {
        params: this.generateParams(params),
      }
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

  createNewItem(inventories: IInventory[]): Observable<IInventory[]> {
    return this.http.post<IInventory[]>(
      `${environment.API_URL}inventory`,
      inventories
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

  exportListToPdf(categoryId: string): Observable<Blob> {
    return this.http.get(`${environment.API_URL}inventory/generate-pdf`, {
      params: this.generateParams({ categoryId }),
      responseType: 'blob',
    });
  }

  writeOff(inventoryId: string): Observable<Partial<IInventory>> {
    return this.http.get<Partial<IInventory>>(
      `${environment.API_URL}inventory/write-off/${inventoryId}`
    );
  }

  private generateParams(params: any): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      if (params[key] === null || params[key] === undefined) {
        return;
      }
      httpParams = httpParams.append(key, params[key]);
    });

    return httpParams;
  }
}
