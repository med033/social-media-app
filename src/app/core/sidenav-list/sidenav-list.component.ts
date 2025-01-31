import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/services/auth.service";
@Component({
  selector: "app-sidenav-list",
  templateUrl: "./sidenav-list.component.html",
  styleUrls: ["./sidenav-list.component.scss"]
})
export class SidenavListComponent {
  constructor(
    private authService: AuthService,
    private router:Router,
    private snackbar:MatSnackBar
  ) {}

  get isAuth() {
    return this.authService.isLoggedIn;
  }

  get currentUser() {
    return this.authService.userData;
  }
  signOut(): void {
    this.authService.signOut();
  }
}
