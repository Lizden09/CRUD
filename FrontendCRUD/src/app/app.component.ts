import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddCountryDialogComponent } from './components/add-country-dialog/add-country-dialog.component';
import { EditCountryDialogComponent } from './components/edit-country-dialog/edit-country-dialog.component';
import { CountryServiceService } from './services/country-service.service';
import { AddPersonDialogComponent } from './components/add-person-dialog/add-person-dialog.component';
import { PersonServiceService } from './services/person-service.service';
import { EditPersonDialogComponent } from './components/edit-person-dialog/edit-person-dialog.component';
import { CompanyComponent } from "./entities/company/company.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatTableModule, MatPaginatorModule, CompanyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'FrontendCRUD';

  displayedColumns: string[] = ['id', 'nombre', 'actions'];
  displayedColumnsPersons: string[] = ['id', 'empresaId', 'nombreCompleto', 'edad', 'telefono', 'correo', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  dataSourcePersons: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /**
   *
   */
  constructor(private toastr: ToastrService, private dialog: MatDialog, private countryService:CountryServiceService, private personService:PersonServiceService) {

  }

  ngOnInit(): void {
    this.getCountries();
    this.getPersons();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCountries() {
    this.countryService.getCountries().subscribe(
      response => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        this.toastr.error(`Error: ${error.error.message}`);
        console.error("Error al obtener los paises: ", error);
      }
    );
  }

  addCountry() {
    const dialogRef = this.dialog.open(AddCountryDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCountries();
      }
    });
  }

  editCountry(country: any) {
    const dialogRef = this.dialog.open(EditCountryDialogComponent, { data: country });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCountries();
      }
    });
  }

  deleteCountry(country: any) {
    this.countryService.deleteCountry(country.id).subscribe(
      response => {
        this.toastr.success("Éxito");
        this.getCountries();
      },
      error => {
        this.toastr.error(`Error al eliminar el país: ${error.error.message}`);
      }
    )
  }

  // Agregar colaboradores

  getPersons() {
    this.personService.getPersons().subscribe(
      response => {
        this.dataSourcePersons = new MatTableDataSource(response);
        this.dataSourcePersons.paginator = this.paginator;
        this.dataSourcePersons.sort = this.sort;
      },
      error => {
        this.toastr.error(`Error: ${error.error.message}`);
        console.error("Error al obtener los colaboradores: ", error);
      }
    );
  }

   addPerson() {
    const dialogRef = this.dialog.open(AddPersonDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getPersons();
      }
    });
  }

  editPerson(person: any) {
    console.log(person);
    const dialogRef = this.dialog.open(EditPersonDialogComponent, { data: person });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getPersons();
      }
    });
  }

  deletePerson(person: any) {
    this.personService.deletePerson(person.id).subscribe(
      response => {
        this.toastr.success("Éxito");
        this.getPersons();
      },
      error => {
        this.toastr.error(`Error al eliminar el país: ${error.error.message}`);
      }
    )
  }
}
