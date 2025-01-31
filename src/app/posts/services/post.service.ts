import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IPost } from "../../shared/interfaces/post";
import { IComment } from "../../shared/interfaces/comment";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class PostService {
  private apiUrl = environment.apiUrl; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  // Create a new post
  createPost(post: IPost): Observable<IPost> {
    return this.http.post<IPost>(`${this.apiUrl}/posts`, post);
  }

  // Get all posts
  getAllPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${this.apiUrl}/posts`);
  }

  // Update likes/dislikes for a post
  updateLikeDislike(postId: string, prop: string, value: number): Observable<IPost> {
    return this.http.patch<IPost>(`${this.apiUrl}/posts/${postId}/like`, { [prop]: value });
  }

  // Delete a post
  deletePost(postId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/posts/${postId}`);
  }

  // Get a single post by ID
  getPost(postId: string): Observable<IPost> {
    return this.http.get<IPost>(`${this.apiUrl}/posts/${postId}`);
  }

  // Add a comment to a post
  addComment(comment: IComment, postId: string): Observable<IComment> {
    return this.http.post<IComment>(`${this.apiUrl}/posts/${postId}/comments`, comment);
  }

  // Get all comments for a post
  getAllComments(postId: string): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${this.apiUrl}/posts/${postId}/comments`);
  }
}