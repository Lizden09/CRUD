import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { PersonServiceService } from '../../services/person-service.service';
import { AddPersonDialogComponent } from '../../components/add-person-dialog/add-person-dialog.component';
import { EditPersonDialogComponent } from '../../components/edit-person-dialog/edit-person-dialog.component';

@Component({
  selector: 'app-employee',
  imports: [MatTableModule, MatPaginator],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  displayedColumnsPersons: string[] = ['id', 'nombreComercial', 'nombreCompleto', 'edad', 'telefono', 'correo', 'actions'];
  dataSourcePersons: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private toastr: ToastrService, private dialog: MatDialog, private personService: PersonServiceService) {

  }

  ngOnInit(): void {
    this.getPersons();
  }

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
