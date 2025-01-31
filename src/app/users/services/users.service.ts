import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { IUser } from "../../shared/interfaces/user";
import { IPost } from "../../shared/interfaces/post";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  private apiUrl = environment.apiUrl; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  // Get a single user by ID with their posts
  getUser(id: string): Observable<IUser & { posts: IPost[] }> {
    return this.http.get<IUser>(`${this.apiUrl}/users/${id}`).pipe(
      switchMap((user: IUser) => {
        // Fetch the user's posts
        return this.http.get<IPost[]>(`${this.apiUrl}/posts?authorId=${user.id}`).pipe(
          map((posts: IPost[]) => {
            // Combine user and posts data
            return {
              ...user,
              posts
            };
          })
        );
      })
    );
  }
}