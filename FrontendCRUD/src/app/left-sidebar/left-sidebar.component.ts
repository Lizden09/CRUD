import { Component } from '@angular/core';
import { RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-left-sidebar',
  imports: [RouterModule],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.css'
})
export class LeftSidebarComponent {
 options = [
    {
      routeLink: 'dashboard',
      icon: 'fal fa-home',
      label: 'Dashboard',
    },
    {
      routeLink: 'countries',
      icon: 'fas fa-globe-americas',
      label: 'Países',
    },
    {
      routeLink: 'states',
      icon: 'fas fa-map-marked-alt',
      label: 'Departamentos',
    },
    {
      routeLink: 'towns',
      icon: 'fas fa-map-marker-alt',
      label: 'Municipios',
    },
    {
      routeLink: 'companies',
      icon: '	far fa-building',
      label: 'Empresas',
    },
    {
      routeLink: 'employees',
      icon: 'fas fa-users',
      label: 'Empleados',
    },
  ];
}
