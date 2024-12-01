import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { VisualizacionComponent } from './visualizacion/visualizacion.component';

const routes: Routes = [
  { path: '', redirectTo: '/busqueda', pathMatch: 'full' },
  { path: 'busqueda', component: BusquedaComponent },
  { path: 'visualizacion', component: VisualizacionComponent },
  { path: '**', redirectTo: '/busqueda', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
