import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { StateService } from '../../services/state.service';
import { TownService } from '../../services/town.service';
import { AddTownDialogComponent } from '../../components/add-town-dialog/add-town-dialog.component';
import { EditTownDialogComponent } from '../../components/edit-town-dialog/edit-town-dialog.component';

@Component({
  selector: 'app-town',
  imports: [MatTableModule, MatPaginator],
  templateUrl: './town.component.html',
  styleUrl: './town.component.css'
})
export class TownComponent implements OnInit {
  displayedColumnsTown: string[] = ['id', 'departamento', 'nombre', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private toastr: ToastrService,
    private dialog: MatDialog,
    private allStatesService: StateService,
    private allTownsService: TownService
  ) {

  }

  ngOnInit(): void {
    this.getAllTowns();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllTowns() {
    this.allTownsService.getAllTowns().subscribe(
      response => {
        console.log(response, "towns"); // confirma que aquí llegan los datos con "departamento.nombre"
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        this.toastr.error(`Error: ${error.error.message}`);
        console.error("Error al obtener los municipios: ", error);
      }
    );
  }

  addTown() {
    const dialogRef = this.dialog.open(AddTownDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllTowns();
      }
    });
  }

  editTown(town: any) {
      const dialogRef = this.dialog.open(EditTownDialogComponent, { data: town });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.getAllTowns();
        }
      });
    }
  
    deleteTowns(town: any) {
      this.allTownsService.deleteTown(town.id).subscribe(
        response => {
          this.toastr.success("Éxito");
          this.getAllTowns();
        },
        error => {
          this.toastr.error(`Error al eliminar el Municipio: ${error.error.message}`);
        }
      )
    }
}
