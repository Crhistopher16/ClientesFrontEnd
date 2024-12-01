import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { VisualizacionComponent } from './visualizacion/visualizacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplyMaskDirective } from './Masks/ApplyMaskDirective';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    BusquedaComponent,
    VisualizacionComponent,
    ApplyMaskDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [ApplyMaskDirective],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
