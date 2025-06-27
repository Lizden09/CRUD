import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CountryServiceService } from '../../services/country-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-country-dialog',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-country-dialog.component.html',
  styleUrl: './edit-country-dialog.component.css'
})
export class EditCountryDialogComponent {

  countryForm!: FormGroup;
  showValidationErrors: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditCountryDialogComponent>,
    private countryService: CountryServiceService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.countryForm = this.fb.group({
      nombre: [data.nombre || '']
    });
  }

  updateCountry() {
    if (this.countryForm.valid) {
      const country = this.countryForm.value;
      this.countryService.updateCountry(this.data.id, country).subscribe(
        response => {
          this.toastr.success("Éxito");
          this.dialogRef.close(true);
        },
        error => {
          this.toastr.error(`Error: ${error.error.message}`);
          console.error('Error al actualizar el país:', error);
        }
      );
    } else {
      this.showValidationErrors = true;
    }
  }

  close() {
    this.dialogRef.close();
  }

  getErrorMessage(field: string): string {
    if (field === 'nombre') {
      return this.countryForm.get('nombre')?.hasError('required') ? 'El nombre es obligatorio' : '';
    }
    return '';
  }
}
