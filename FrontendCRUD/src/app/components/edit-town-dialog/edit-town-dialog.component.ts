import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CountryServiceService } from '../../services/country-service.service';
import { StateService } from '../../services/state.service';
import { TownService } from '../../services/town.service';

@Component({
  selector: 'app-edit-town-dialog',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-town-dialog.component.html',
  styleUrl: './edit-town-dialog.component.css'
})
export class EditTownDialogComponent implements OnInit{
  townsForm!: FormGroup;
  showValidationErrors: boolean = false
  states: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditTownDialogComponent>,
    private toastr: ToastrService,
    private countryService: CountryServiceService,
    private allStateService: StateService,
    private allTownService: TownService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.townsForm = this.fb.group({
      id: [data.id || 1, Validators.required],
      departamentoId: [data.departamentoId || 1, Validators.required],
      nombre: [data.nombre || null, Validators.required],
    });
  }
  ngOnInit(): void {
this.loadStates();  }

  loadStates() {
    this.allStateService.getAllStates().subscribe({
      next: (data) => {
        this.states = data;
      },
      error: (err) => {
        console.error('Error al cargar los departamentos:', err);
      }
    });
  }

  updateTown() {
    if (this.townsForm.valid) {
      const town = this.townsForm.value;
      this.allTownService.updateTown(this.data.id, town).subscribe(
        response => {
          this.toastr.success("Éxito");
          this.dialogRef.close(true);
        },
        error => {
          this.toastr.error(`Error: ${error.error.message}`);
          console.error('Error al actualizar el municipio: ', error);
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
      return this.townsForm.get('nombre')?.hasError('required') ? 'El campo es obligatorio' : '';
    }
    if (field === 'nombre') {
      return this.townsForm.get('nombre')?.hasError('required') ? 'El campo es obligatorio' : '';
    }
    return '';
  }
}
