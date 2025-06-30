import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../services/company.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-company-dialog',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-company-dialog.component.html',
  styleUrl: './add-company-dialog.component.css'
})
export class AddCompanyDialogComponent {

  companyForm!: FormGroup;
  showValidationErrors: boolean = false

    constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddCompanyDialogComponent>,
    private companyService: CompanyService,
    private toastr: ToastrService,
  ) {
    this.companyForm = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

    addCompany() {
    if (this.companyForm.valid) {
      const company = this.companyForm.value;
      this.companyService.addCompany(company).subscribe(
        response => {
          this.toastr.success("Empresa creada con éxito");
          this.dialogRef.close(true);
        },
        error => {
          this.toastr.error(`Error: ${error.error.message}`);
          console.error('Error al agregar', error);
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
      return this.companyForm.get('nombre')?.hasError('required') ? 'El campo es obligatorio' : '';
    }
    if (field === 'nombre') {
      return this.companyForm.get('nombre')?.hasError('required') ? 'El campo es obligatorio' : '';
    }
    return '';
  }
}
