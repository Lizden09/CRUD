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
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { MainComponent } from './main/main.component';


@Component({
  selector: 'app-root',
  imports: [LeftSidebarComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'FrontendCRUD';

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /**
   *
   */
  constructor(private toastr: ToastrService, private dialog: MatDialog, private countryService:CountryServiceService, private personService:PersonServiceService) {

  }

  ngOnInit(): void {
  }

  // Agregar colaboradores

  

   
}
