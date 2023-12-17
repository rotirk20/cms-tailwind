import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/modules/dashboard/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:5000/api/';
  constructor(public http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}categories`);
  }

  updateCategory(id: string, body: string): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}categories/${id}`, body);
  }

  getCategory(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}categories/${id}`);
  }

  createCategory(body: string): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}categories`, body);
  }

  deleteCategory(id: string): Observable<Category> {
    return this.http.delete<Category>(`${this.baseUrl}categories/${id}`);
  }
}
