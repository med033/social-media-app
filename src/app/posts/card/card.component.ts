import { Component, Input, ViewChild, ElementRef } from "@angular/core";
import { IPost } from "../../shared/interfaces/post";
import { Router, ActivatedRoute } from "@angular/router";
import { IUser } from "../../shared/interfaces/user";
import { AuthService } from "../../auth/services/auth.service";
import { PostService } from "../services/post.service";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class CardComponent {
  @Input() post: IPost;
  @ViewChild("like", { static: false }) like: ElementRef;
  @ViewChild("dislike", { static: false }) dislike: ElementRef;
  private userData: IUser;
  isDetailPage = !!this.activatedRoute.snapshot.params.id;
  constructor(
    private router: Router,
    private authService: AuthService,
    private _post: PostService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.userData = this.authService.userData;
  }

  get isAuthor() {
    if (!this.userData) {
      return false;
    }
    return this.userData.id === this.post.author.id;
  }

 // Like a post
 likePost(postId: string): void {
  const newLikes = this.post.likes + 1; // Increment likes
  this._post.updateLikeDislike(postId, "likes", newLikes).subscribe({
    next: (updatedPost) => {
      this.post = updatedPost; // Update the post with the new like count
    },
    error: (err) => {
      console.error("Failed to like post:", err);
    }
  });
}

// Dislike a post
dislikePost(postId: string): void {
  const newDislikes = this.post.dislikes + 1; // Increment dislikes
  this._post.updateLikeDislike(postId, "dislikes", newDislikes).subscribe({
    next: (updatedPost) => {
      this.post = updatedPost; // Update the post with the new dislike count
    },
    error: (err) => {
      console.error("Failed to dislike post:", err);
    }
  });
}


  getDetails(postId: string) {
    this.router.navigate(["post", postId]);
  }

  deletePost() {
    this._post.deletePost(this.post.id)
}
}