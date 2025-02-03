import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { IPost } from "../../shared/interfaces/post";
import { IComment } from "../../shared/interfaces/comment";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class PostService {
  private apiUrl = environment.apiUrl; // Backend API URL

  constructor(private http: HttpClient) {}

  // Helper method to get the token from localStorage and set headers
  private getAuthHeaders(): HttpHeaders {
    const token = JSON.parse(localStorage.getItem('currentUser'))['token']; // Retrieve token from localStorage
    return new HttpHeaders({
      'x-auth-token': token,
      'Content-Type': 'application/json' // Optional if your API expects JSON
    });
  }

  // Create a new post
  createPost(post: IPost): Observable<IPost> {
    return this.http.post<IPost>(`${this.apiUrl}/posts`, post, { headers: this.getAuthHeaders() });
  }

  // Get all posts
  getAllPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${this.apiUrl}/posts`, { headers: this.getAuthHeaders() });
  }

  // Update likes/dislikes for a post
  updateLikeDislike(postId: string, prop: string, value: number): Observable<IPost> {
    return this.http.patch<IPost>(
      `${this.apiUrl}/posts/${postId}/like`, 
      { [prop]: value }, 
      { headers: this.getAuthHeaders() }
    );
  }

  // Delete a post
  deletePost(postId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/posts/${postId}`, { headers: this.getAuthHeaders() });
  }

  // Get a single post by ID
  getPost(postId: string): Observable<IPost> {
    return this.http.get<IPost>(`${this.apiUrl}/posts/${postId}`, { headers: this.getAuthHeaders() });
  }

  // Add a comment to a post
  addComment(comment: IComment, postId: string): Observable<IComment> {
    return this.http.post<IComment>(`${this.apiUrl}/posts/${postId}/comments`, comment, { headers: this.getAuthHeaders() });
  }

  // Get all comments for a post
  getAllComments(postId: string): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${this.apiUrl}/posts/${postId}/comments`, { headers: this.getAuthHeaders() });
  }
}
