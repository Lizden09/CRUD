import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CountryServiceService } from '../../services/country-service.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-country-dialog',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-country-dialog.component.html',
  styleUrl: './add-country-dialog.component.css'
})
export class AddCountryDialogComponent {

  countryForm!: FormGroup;
  showValidationErrors: boolean = false

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddCountryDialogComponent>,
    private countryService: CountryServiceService,
    private toastr: ToastrService,
  ) {
    this.countryForm = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  addCountry() {
    if (this.countryForm.valid) {
      const country = this.countryForm.value;
      this.countryService.addCountry(country).subscribe(
        response => {
          this.toastr.success("País creado con éxito");
          this.dialogRef.close(true);
        },
        error => {
          this.toastr.error(`Error: ${error.error.message}`);
          console.error('Error al agregar el país:', error);
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
