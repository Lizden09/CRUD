import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CountryServiceService } from '../../services/country-service.service';
import { StateService } from '../../services/state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-state-dialog',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-state-dialog.component.html',
  styleUrl: './add-state-dialog.component.css'
})
export class AddStateDialogComponent implements OnInit{
  statesForm!: FormGroup;
  showValidationErrors: boolean = false
  countries: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddStateDialogComponent>,
    private toastr: ToastrService,
    private countryService: CountryServiceService,
    private stateService: StateService,
  ) {
    this.statesForm = this.fb.group({
      id: [1, Validators.required],
      paisId: [1, Validators.required],
      nombre: [null, Validators.required],
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

  addState() {
    if (this.statesForm.valid) {
      const state = this.statesForm.value;
      this.stateService.addState(state).subscribe(
        response => {
          this.toastr.success("Departamento creado con éxito");
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
      return this.statesForm.get('nombre')?.hasError('required') ? 'El campo es obligatorio' : '';
    }
    if (field === 'nombre') {
      return this.statesForm.get('nombre')?.hasError('required') ? 'El campo es obligatorio' : '';
    }
    return '';
  }
}
