import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { 
    path: 'dashboard', 
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) 
  },
  { 
    path: 'financiera', 
    loadChildren: () => import('./features/financiera/financiera.module').then(m => m.FinancieraModule) 
  },
  { 
    path: 'inscripciones', 
    loadChildren: () => import('./features/inscripciones/inscripciones.module').then(m => m.InscripcionesModule) 
  },
  { 
    path: 'puntuacion', 
    loadChildren: () => import('./features/puntuacion/puntuacion.module').then(m => m.PuntuacionModule) 
  },
  { 
    path: 'identificacion-auxilio', 
    loadChildren: () => import('./features/identificacion-auxilio/identificacion-auxilio.module').then(m => m.IdentificacionAuxilioModule) 
  },
  { 
    path: 'configuracion', 
    loadChildren: () => import('./features/configuracion/configuracion.module').then(m => m.ConfiguracionModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
