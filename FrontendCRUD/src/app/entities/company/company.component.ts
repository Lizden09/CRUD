import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CompanyService } from '../../services/company.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AddCompanyDialogComponent } from '../../components/add-company-dialog/add-company-dialog.component';
import { EditCompanyDialogComponent } from '../../components/edit-company-dialog/edit-company-dialog.component';

@Component({
  selector: 'app-company',
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent {

  displayedColumnsCompany: string[] = ['id', 'pais', 'estado', 'nit', 'razonSocial', 'nombreComercial', 'telefono', 'correo', 'actions'];
  dataSourceCompany: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private toastr: ToastrService, private dialog: MatDialog, private companyService: CompanyService) {

  }

  ngOnInit() {
    this.getCompany();
  }

  getCompany() {
    this.companyService.getCompany().subscribe(
      response => {
        this.dataSourceCompany = new MatTableDataSource(response);
        this.dataSourceCompany.paginator = this.paginator;
        this.dataSourceCompany.sort = this.sort;
      },
      error => {
        this.toastr.error(`Error: ${error.error.message}`);
        console.error("Error al obtener los paises: ", error);
      }
    );
  }

  addCompany() {
    const dialogRef = this.dialog.open(AddCompanyDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCompany();
      }
    });
  }

  editCompany(company: any) {
    const dialogRef = this.dialog.open(EditCompanyDialogComponent, { data: company });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCompany();
      }
    });
  }

  deleteCompany(company: any) {
    this.companyService.deleteCompany(company.id).subscribe(
      response => {
        this.toastr.success("Éxito");
        this.getCompany();
      },
      error => {
        this.toastr.error(`Error al eliminar la empresa: ${error.error.message}`);
      }
    )
  }
}
