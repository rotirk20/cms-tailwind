import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post, SinglePost } from 'src/app/modules/dashboard/models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = 'http://localhost:5000/api';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(public http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts`, { headers: this.headers });
  }

  getPost(id: string): Observable<SinglePost> {
    return this.http.get<SinglePost>(`${this.baseUrl}/posts/${id}`, { headers: this.headers });
  }

  updatePost(id: string, body: string): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/posts/${id}`, body, { headers: this.headers });
  }

  createPost(body: string): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/posts`, body, { headers: this.headers });
  }

  deletePost(id: string): Observable<Post> {
    return this.http.delete<Post>(`${this.baseUrl}/posts/${id}`);
  }
}
