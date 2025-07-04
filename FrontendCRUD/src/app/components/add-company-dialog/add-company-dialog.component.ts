import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../services/company.service';
import { CommonModule } from '@angular/common';
import { CountryServiceService } from '../../services/country-service.service';
import { StateService } from '../../services/state.service';
import { TownService } from '../../services/town.service';

@Component({
  selector: 'app-add-company-dialog',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-company-dialog.component.html',
  styleUrl: './add-company-dialog.component.css'
})
export class AddCompanyDialogComponent implements OnInit {

  companyForm!: FormGroup;
  showValidationErrors: boolean = false
  countries: any[] = [];
  states: any[] = [];
  towns: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddCompanyDialogComponent>,
    private companyService: CompanyService,
    private toastr: ToastrService,
    private countryService: CountryServiceService,
    private stateService: StateService,
    private townService: TownService
  ) {
    this.companyForm = this.fb.group({
      paisId: [1, Validators.required],
      departamentoId: [null, Validators.required],
      municipioId: [null, Validators.required],
      nit: ["", Validators.required],
      razonSocial: ["", Validators.required],
      nombreComercial: ["", Validators.required],
      telefono: ["", Validators.required],
      correo: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCountries();
    // this.loadStates();
    // this.loadTowns();
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

  addCompany() {
    if (this.companyForm.valid) {
      const company = this.companyForm.value;
      company.departamentoId = Number(company.departamentoId);
      company.municipioId = Number(company.municipioId);
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
