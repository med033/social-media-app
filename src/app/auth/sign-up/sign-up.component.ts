import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent {
  avatars: { value: string; link: string }[] = [
    {
      value: "Man",
      link: "assets/images/avatar-man.png"
    },
    {
      value: "Women",
      link: "assets/images/avatar-women.png"
    }
  ];
  errorMessage: any;
  hidePassword = false;
  constructor(private _auth:AuthService,
    private router:Router
  ) {}

  signUp(value) {
    const { username, passwordsGroup, email, avatar } = value;

    // Prepare the data object for the API request
    const data = {
      username,
      password: passwordsGroup.password,
      email,
      avatar
    };
  
    this._auth.signUp(data).subscribe({
      next: (response) => {
        // Handle successful sign-up
        console.log('Sign-up successful!', response);
        // Optionally, redirect the user or show a success message
        this.router.navigate(['/login']); // Redirect to login page
      },
      error: (err) => {
        // Handle sign-up error
        console.error('Sign-up failed:', err);
        // Display an error message to the user
        this.errorMessage = err.error?.message || 'An error occurred during sign-up.';
      }
    });
  }

}
