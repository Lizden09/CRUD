import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StateService } from '../../services/state.service';
import { CountryServiceService } from '../../services/country-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-state-dialog',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './edit-state-dialog.component.html',
  styleUrl: './edit-state-dialog.component.css'
})
export class EditStateDialogComponent implements OnInit {

  statesForm!: FormGroup;
  showValidationErrors: boolean = false
  countries: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditStateDialogComponent>,
    private toastr: ToastrService,
    private countryService: CountryServiceService,
    private stateService: StateService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.statesForm = this.fb.group({
      id: [data.id || 1, Validators.required],
      paisId: [data.paisId || 1, Validators.required],
      nombre: [data.nombre || null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries() {
    this.countryService.getCountries().subscribe({
      next: (data) => {
        this.countries = data;
      },
      error: (err) => {
        console.error('Error al cargar los países:', err);
      }
    });
  }

  updateState() {
    if (this.statesForm.valid) {
      const state = this.statesForm.value;
      state.paisId = Number(state.paisId);
      this.stateService.updateState(this.data.id, state).subscribe(
        response => {
          this.toastr.success("Éxito");
          this.dialogRef.close(true);
        },
        error => {
          this.toastr.error(`Error: ${error.error.message}`);
          console.error('Error al actualizar el departamento: ', error);
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
      return this.statesForm.get('nombre')?.hasError('required') ? 'El nombre es obligatorio' : '';
    }
    return '';
  }
}
