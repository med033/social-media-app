import { Component, OnInit } from "@angular/core";
import { IPost } from "../../shared/interfaces/post";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { PostService } from "../services/post.service";

@Component({
  selector: "app-details",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"]
})
export class DetailComponent implements OnInit {
  post$: Observable<IPost>;

  constructor(
    private activateRoute: ActivatedRoute,
    private _post:PostService
  ) {}

  ngOnInit() {
    const postId: string = this.activateRoute.snapshot.params.id;
    this.post$ = this._post.getPost(postId)
  }
}
