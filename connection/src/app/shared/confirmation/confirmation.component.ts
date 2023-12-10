import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';

interface DialogData {
  title: string;
  content: string;
}

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, MatDialogClose],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss',
})
export class ConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onCancel() {
    this.dialogRef.close();
  }
}
