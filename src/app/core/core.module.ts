import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { MaterialModule } from "../material/material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AuthModule } from "../auth/auth.module";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidenavListComponent } from "./sidenav-list/sidenav-list.component";
import { CommonModule } from "@angular/common";
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    SidenavListComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    AuthModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    HomeComponent,
    SidenavListComponent,
    NavbarComponent,
    NotFoundComponent
  ]
})
export class CoreModule {}
