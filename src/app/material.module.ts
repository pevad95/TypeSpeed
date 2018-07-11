import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatBadgeModule,
  MatButtonModule, MatCardModule, MatChipsModule, MatDividerModule, MatExpansionModule, MatExpansionPanel,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule, MatSnackBarModule,
  MatToolbarModule
} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatChipsModule,
    MatIconModule,
    MatListModule,
    MatBadgeModule,
    MatDividerModule
  ],
  exports: [
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatChipsModule,
    MatIconModule,
    MatListModule,
    MatBadgeModule,
    MatDividerModule
  ]
})
export class MaterialModule { }
