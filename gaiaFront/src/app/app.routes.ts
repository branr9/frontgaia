import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Financiera } from './financiera/financiera';
import { Inscripcion } from './inscripcion/inscripcion';
import { Puntuacion } from './puntuacion/puntuacion';
import { IdentidicacionAuxilio } from './identidicacion-auxilio/identidicacion-auxilio';
import { Configuracion } from './configuracion/configuracion';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard' }
      },
      {
        path: 'financiera',
        component: Financiera,
        data: { title: 'Gestion Financiera' }
      },
      {
        path: 'inscripciones',
        component: Inscripcion,
        data: { title: 'Inscripciones' }
      },
      {
        path: 'puntuacion',
        component: Puntuacion,
        data: { title: 'Puntuaciones' }
      },
      {
        path: 'identificacion-auxilio',
        component: IdentidicacionAuxilio,
        data: { title: 'Identificacion de Auxilio' }
      },
      {
        path: 'configuracion',
        component: Configuracion,
        data: { title: 'Configuracion' }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
