import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PersonServiceService } from '../../services/person-service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-add-person-dialog',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-person-dialog.component.html',
  styleUrl: './add-person-dialog.component.css'
})
export class AddPersonDialogComponent implements OnInit{

 personForm!: FormGroup;
  showValidationErrors: boolean = false
  empresas: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddPersonDialogComponent>,
    private personService: PersonServiceService,
    private toastr: ToastrService,
    private companyService: CompanyService
  ) {
    this.personForm = this.fb.group({
      empresaId: [1, Validators.required],
      nombreCompleto: ['', Validators.required],
      edad: [null, Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required],
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

  addPerson() {
    if (this.personForm.valid) {
      const person = this.personForm.value;
      person.empresaId = Number(person.empresaId);
      this.personService.addPerson(person).subscribe(
        response => {
          this.toastr.success("Colaborador creado con éxito");
          this.dialogRef.close(true);
        },
        error => {
          this.toastr.error(`Error: ${error.error.message}`);
          console.error('Error al agregar el colaborador:', error);
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
