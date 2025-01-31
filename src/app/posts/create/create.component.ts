import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { PostService } from "../services/post.service";
import { AuthService } from "../../auth/services/auth.service";
import { IPost } from "../../shared/interfaces/post";
import { IUser } from "../../shared/interfaces/user";

@Component({
  selector: "app-create-post",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateComponent {
  postForm: FormGroup;
  private _userData: IUser;

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private authService: AuthService,
    private postService: PostService
  ) {
    this._userData = this.authService.userData;
    this.postForm = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
    });
  }

  // Create post
  createPost(title,description): void {
    if (this.postForm.invalid) {
      this.snackbar.open("Please fill all required fields", "Close", {
        duration: 3000
      });
      return;
    }


    const post: IPost = {
      title: title,
      content: description,
      author: this._userData,
      likes: 0
    };

    this.postService.createPost(post).subscribe({
      next: (createdPost) => {
        this.snackbar.open("Post created successfully", "Close", {
          duration: 3000
        });
        this.postForm.reset(); // Clear the form
      },
      error: (err) => {
        console.error("Failed to create post:", err);
        this.snackbar.open("Failed to create post. Please try again.", "Close", {
          duration: 3000
        });
      }
    });
  }
}