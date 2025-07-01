import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CountryServiceService } from '../../services/country-service.service';
import { StateService } from '../../services/state.service';
import { CommonModule } from '@angular/common';
import { AddStateDialogComponent } from '../../components/add-state-dialog/add-state-dialog.component';
import { EditStateDialogComponent } from '../../components/edit-state-dialog/edit-state-dialog.component';

@Component({
  selector: 'app-state',
  imports: [CommonModule, MatTableModule, MatPaginator],
  templateUrl: './state.component.html',
  styleUrl: './state.component.css'
})
export class StateComponent implements OnInit {
  displayedColumnsState: string[] = ['id', 'pais', 'nombre', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private toastr: ToastrService,
    private dialog: MatDialog,
    private countryService: CountryServiceService,
    private allStatesService: StateService
  ) {

  }
  ngOnInit(): void {
    this.getAllStates();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllStates() {
    this.allStatesService.getAllStates().subscribe(
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

  addState() {
    const dialogRef = this.dialog.open(AddStateDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllStates();
      }
    });
  }

  editState(state: any) {
    const dialogRef = this.dialog.open(EditStateDialogComponent, { data: state });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllStates();
      }
    });
  }

  deleteState(state: any) {
    this.allStatesService.deleteState(state.id).subscribe(
      response => {
        this.toastr.success("Éxito");
        this.getAllStates();
      },
      error => {
        this.toastr.error(`Error al eliminar el Departamento: ${error.error.message}`);
      }
    )
  }
}
