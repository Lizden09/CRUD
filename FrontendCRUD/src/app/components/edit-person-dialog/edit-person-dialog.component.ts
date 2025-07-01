import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PersonServiceService } from '../../services/person-service.service';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-edit-person-dialog',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-person-dialog.component.html',
  styleUrl: './edit-person-dialog.component.css'
})
export class EditPersonDialogComponent implements OnInit{

  personForm!: FormGroup;
  showValidationErrors: boolean = false;
  empresas: any[] = [];
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditPersonDialogComponent>,
    private personService: PersonServiceService,
    private toastr: ToastrService,
    private companyService: CompanyService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
   this.personForm = this.fb.group({
      empresaId: [data.empresaId || null, Validators.required],
      nombreCompleto: [data.nombreCompleto || '', Validators.required],
      edad: [data.edad || null, Validators.required],
      telefono: [data.telefono || '', Validators.required],
      correo: [data.correo || '', Validators.required],
    });
  }
   
  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies() {
    this.companyService.getCompany().subscribe({
      next: (data) => {
        this.empresas = data;
      },
      error: (err) => {
        console.error('Error al cargar las empresas:', err);
      }
    });
  }

   updatePerson() {
    if (this.personForm.valid) {
      const person = this.personForm.value;
      person.empresaId = Number(person.empresaId);
      this.personService.updatePerson(this.data.id, person).subscribe(
        response => {
          this.toastr.success("Éxito");
          this.dialogRef.close(true);
        },
        error => {
          this.toastr.error(`Error: ${error.error.message}`);
          console.error('Error al actualizar el colaborador:', error);
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
    if (field === 'empresaId') {
      return this.personForm.get('empresaId')?.hasError('required') ? 'Campo obligatorio' : '';
    }
    if (field === 'nombreCompleto') {
      return this.personForm.get('nombreCompleto')?.hasError('required') ? 'Campo obligatorio' : '';
    }
    if (field === 'edad') {
      return this.personForm.get('edad')?.hasError('required') ? 'Campo obligatorio' : '';
    }
    if (field === 'telefono') {
      return this.personForm.get('telefono')?.hasError('required') ? 'Campo obligatorio' : '';
    }
    if (field === 'correo') {
      return this.personForm.get('correo')?.hasError('required') ? 'Campo obligatorio' : '';
    }
    return '';
  }

}
