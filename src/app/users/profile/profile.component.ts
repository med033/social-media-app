import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { IUser } from "../../shared/interfaces/user";
import { UsersService } from "../services/users.service";


@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  user$: Observable<IUser>;
  constructor(
    private _user:UsersService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.user$ = this._user.getUser(this.activateRoute.snapshot.params.id)
  }


}
