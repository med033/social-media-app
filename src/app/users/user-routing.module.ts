import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";
import { AuthGuard } from "../shared/guards/auth.guard";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "list" },
  { path: ":id", component: ProfileComponent, canActivate: [AuthGuard] }
];

export const UserRoutingModule = RouterModule.forChild(routes);
