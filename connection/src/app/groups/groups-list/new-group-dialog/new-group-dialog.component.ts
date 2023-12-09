import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogClose, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-group-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogClose,
  ],
  templateUrl: './new-group-dialog.component.html',
  styleUrl: './new-group-dialog.component.scss',
})
export class NewGroupDialogComponent {
  name = new FormControl('', {
    validators: [Validators.maxLength(30), Validators.pattern('^[a-zA-Zа-яА-Я0-9 ]*$')],
  });

  constructor(public dialogRef: MatDialogRef<NewGroupDialogComponent>) {}

  onCancel() {
    this.dialogRef.close();
  }
}
