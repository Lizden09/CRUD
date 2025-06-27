import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PersonServiceService } from '../../services/person-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-person-dialog',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-person-dialog.component.html',
  styleUrl: './edit-person-dialog.component.css'
})
export class EditPersonDialogComponent {

  personForm!: FormGroup;
  showValidationErrors: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditPersonDialogComponent>,
    private personService: PersonServiceService,
    private toastr: ToastrService,
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

   updatePerson() {
    if (this.personForm.valid) {
      const person = this.personForm.value;
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
