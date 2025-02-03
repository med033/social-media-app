import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent {
  hidePassword = false
  constructor(private _auth:AuthService,
    private router:Router
  ) {}

  signIn(value) {
    this._auth.signIn(value).subscribe({
      next: (response) => {
        // Handle successful sign-in
        console.log('Sign-in successful!', response);
        // this.isLoading = false; // Reset loading state
        this.router.navigate(['/post/list']); // Redirect to dashboard or home page
      },
      error: (err) => {
        // Handle sign-in error
        console.error('Sign-in failed:', err);
        // this.isLoading = false; // Reset loading state
  
        // Display a user-friendly error message
        // if (err.status === 401) {
        //   this.errorMessage = 'Invalid email or password. Please try again.';
        // } else if (err.status === 500) {
        //   this.errorMessage = 'Server error. Please try again later.';
        // } else {
        //   this.errorMessage = 'An unexpected error occurred. Please try again later.';
        // }
      }
    });
  }
}
