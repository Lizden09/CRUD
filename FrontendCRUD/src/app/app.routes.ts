import { Routes } from '@angular/router';
import { CompanyComponent } from './entities/company/company.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CountryComponent } from './entities/country/country.component';
import { StateComponent } from './entities/state/state.component';
import { TownComponent } from './entities/town/town.component';
import { EmployeeComponent } from './entities/employee/employee.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'countries', component: CountryComponent },
    { path: 'states', component: StateComponent },
    { path: 'towns', component: TownComponent },
    { path: 'companies', component: CompanyComponent },
    { path: 'employees', component: EmployeeComponent }
];
