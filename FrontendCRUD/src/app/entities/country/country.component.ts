import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CountryServiceService } from '../../services/country-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddCountryDialogComponent } from '../../components/add-country-dialog/add-country-dialog.component';
import { EditCountryDialogComponent } from '../../components/edit-country-dialog/edit-country-dialog.component';

@Component({
  selector: 'app-country',
  imports: [MatTableModule, MatPaginator],
  templateUrl: './country.component.html',
  styleUrl: './country.component.css'
})
export class CountryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private toastr: ToastrService, 
    private dialog: MatDialog, 
    private countryService:CountryServiceService) {

  }

  ngOnInit(): void {
    this.getCountries();
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
}
