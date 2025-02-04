import { NgModule } from "@angular/core";
import {
  MatSliderModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatDividerModule,
  MatInputModule,
  MatSnackBarModule,
  MatGridListModule,
  MatProgressBarModule,
  MatCardModule,
  MatSelectModule,
  MatMenuModule,
  MatFormFieldModule,
  MatBadgeModule
} from "@angular/material";
@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatSliderModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatDividerModule,
    MatSnackBarModule,
    MatGridListModule,
    MatProgressBarModule,
    MatCardModule,
    MatSelectModule,
    MatBadgeModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatSliderModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatDividerModule,
    MatSnackBarModule,
    MatGridListModule,
    MatProgressBarModule,
    MatCardModule,
    MatSelectModule,
    MatMenuModule,
    MatBadgeModule

  ]
})
export class MaterialModule {}
