import { Component, OnInit } from "@angular/core";
import { PostService } from "../services/post.service";
import { IPost } from "../../shared/interfaces/post";
import { Observable } from "rxjs";

@Component({
  selector: "app-all-posts",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  allPosts$: Observable<IPost[]>; // Observable to hold the list of posts

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.fetchAllPosts(); // Fetch all posts when the component initializes
  }

  // Fetch all posts from the backend
  fetchAllPosts(): void {
    this.allPosts$ = this.postService.getAllPosts();
  }
}