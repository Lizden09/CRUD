import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyService } from '../../services/company.service';
import { ToastrService } from 'ngx-toastr';
import { CountryServiceService } from '../../services/country-service.service';
import { CommonModule } from '@angular/common';
import { TownService } from '../../services/town.service';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-edit-company-dialog',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './edit-company-dialog.component.html',
  styleUrl: './edit-company-dialog.component.css'
})
export class EditCompanyDialogComponent implements OnInit {

  companyForm!: FormGroup;
  showValidationErrors: boolean = false
  countries: any[] = [];
  states: any[] = [];
  towns: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditCompanyDialogComponent>,
    private companyService: CompanyService,
    private toastr: ToastrService,
    private countryService: CountryServiceService,
    private stateService: StateService,
        private townService: TownService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.companyForm = this.fb.group({
      paisId: [data.paisId || 1, Validators.required],
      departamentoId: [data.departamentoId || null, Validators.required],
      municipioId: [data.municipioId || null, Validators.required],
      nit: [data.nit || "", Validators.required],
      razonSocial: [data.razonSocial || "", Validators.required],
      nombreComercial: [data.nombreComercial || "", Validators.required],
      telefono: [data.telefono || "", Validators.required],
      correo: [data.correo || "", Validators.required]
    });
  }
  ngOnInit(): void {
    this.loadCountries();

    const paisId = this.companyForm.get('paisId')?.value;
    if (paisId) {
      this.loadStates(Number(paisId));
    }

    this.companyForm.get('paisId')?.valueChanges.subscribe(id => {
      this.companyForm.get('departamentoId')?.setValue(null);
      this.loadStates(Number(id));
    });
    
    const departamentoId = this.companyForm.get('departamentoId')?.value;
    if (departamentoId) {
      this.loadTowns(Number(departamentoId));
    }
    
    this.companyForm.get('departamentoId')?.valueChanges.subscribe(id => {
      this.companyForm.get('municipioId')?.setValue(null);
      this.loadTowns(Number(id));
    });
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

  loadStates(paisId: number) {
    this.stateService.getStates(paisId).subscribe({
      next: (data) => {
        this.states = data;
      },
      error: (err) => {
        console.error('Error al cargar los departamentos:', err);
      }
    });
  }

  loadTowns(departamentoId: number) {
    this.townService.getTowns(departamentoId).subscribe({
      next: (data) => {
        this.towns = data;
      },
      error: (err) => {
        console.error('Error al cargar los municipios:', err);
      }
    });
  }

  updateCompany() {
    if (this.companyForm.valid) {
      const company = this.companyForm.value;
      company.paisId = Number(company.paisId);
      company.departamentoId = Number(company.departamentoId);
      company.municipioId = Number(company.municipioId);
      this.companyService.updateCompany(this.data.id, company).subscribe(
        response => {
          this.toastr.success("Éxito");
          this.dialogRef.close(true);
        },
        error => {
          this.toastr.error(`Error: ${error.error.message}`);
          console.error('Error al actualizar la empresa: ', error);
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
      return this.companyForm.get('nombre')?.hasError('required') ? 'El nombre es obligatorio' : '';
    }
    return '';
  }
}
