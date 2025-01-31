import { NgModule } from "@angular/core";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../material/material.module";
import { FormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";
import { AuthRoutingModule } from "./auth-routing.module";
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    RouterModule,
    AuthRoutingModule,
    SharedModule
  ],
  exports: [SignInComponent]
})
export class AuthModule {}
