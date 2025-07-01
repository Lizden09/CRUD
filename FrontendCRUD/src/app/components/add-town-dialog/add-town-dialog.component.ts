import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StateService } from '../../services/state.service';
import { CommonModule } from '@angular/common';
import { CountryServiceService } from '../../services/country-service.service';
import { TownService } from '../../services/town.service';

@Component({
  selector: 'app-add-town-dialog',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-town-dialog.component.html',
  styleUrl: './add-town-dialog.component.css'
})
export class AddTownDialogComponent implements OnInit {

  townsForm!: FormGroup;
  showValidationErrors: boolean = false
  states: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddTownDialogComponent>,
    private toastr: ToastrService,
    private countryService: CountryServiceService,
    private allStateService: StateService,
    private allTownService: TownService
  ) {
    this.townsForm = this.fb.group({
      id: [1, Validators.required],
      departamentoId: [1, Validators.required],
      nombre: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadStates();
  }

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

  addTown() {
    if (this.townsForm.valid) {
      const town = this.townsForm.value;
      this.allTownService.addTown(town).subscribe(
        response => {
          this.toastr.success("Municipio creado con éxito");
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
      return this.townsForm.get('nombre')?.hasError('required') ? 'El campo es obligatorio' : '';
    }
    if (field === 'nombre') {
      return this.townsForm.get('nombre')?.hasError('required') ? 'El campo es obligatorio' : '';
    }
    return '';
  }
}
