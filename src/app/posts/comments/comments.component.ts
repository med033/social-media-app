import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { PostService } from '../services/post.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IPost } from 'src/app/shared/interfaces/post';
import { IComment } from 'src/app/shared/interfaces/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() post: IPost;
  private postId: string = this.activatedRoute.snapshot.params.id;
  allComments$: Observable<IComment[]>;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private _post: PostService // Inject the CommentsService
  ) {}

  ngOnInit() {
    this.loadComments();
  }

  // Load all comments for the post
  loadComments() {
    this.allComments$ = this._post.getAllComments(this.postId);
  }

  // Add a new comment
  addComment(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const comment: IComment = {
      avatar: this.authService.userData.avatar,
      content: form.value.comment,
      likes: 0,
      dislikes: 0
    };

    this._post.addComment(comment, this.postId).subscribe({
      next: (newComment) => {
        // Reload comments after adding a new one
        this.loadComments();
        form.resetForm(); // Reset the form after successful submission
      },
      error: (err) => {
        console.error('Failed to add comment:', err);
      }
    });
  }
}