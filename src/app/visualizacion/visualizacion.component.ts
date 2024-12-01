import { Component, OnInit, ViewChild } from '@angular/core';
import { BusquedaClientes } from '../interfaces/BusquedaClientes.interface';
import { BusquedaComponent } from '../busqueda/busqueda.component';
import { ClientesService } from '../services/clientes.service';
import { Cliente } from '../interfaces/Cliente.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visualizacion',
  templateUrl: './visualizacion.component.html'
})
export class VisualizacionComponent implements OnInit {

  busqueda: BusquedaClientes = {
    tipoDocumento: '',
    numeroDocumento: ''
  }

  cliente: Cliente | null= {
    numeroDocumento: '',
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    telefono: '',
    direccion: '',
    ciudadResidencia: ''
  }

  get etiquetas(){
    return [
      { value: this.cliente?.primerNombre,     label: 'Primer Nombre'},
      { value: this.cliente?.segundoNombre,    label: 'Segundo Nombre'},
      { value: this.cliente?.primerApellido,   label: 'Primer Apellido'},
      { value: this.cliente?.segundoApellido,  label: 'Segundo Apellido'},
      { value: this.cliente?.telefono,         label: 'Teléfono'},
      { value: this.cliente?.direccion,        label: 'Dirección'},
      { value: this.cliente?.ciudadResidencia, label: 'Ciudad de Residencia'},
    ];
  }

  mostrarCliente: boolean = true;

  constructor(private service: ClientesService, private router: Router){}

  ngOnInit(): void {
      this.service.busqueda$.subscribe(data =>{
        this.busqueda = data
        let numeroDoc = this.busqueda.numeroDocumento.replace(/\./g, '');
        let tipoDoc = this.busqueda.tipoDocumento;
          this.service.getCliente(numeroDoc, tipoDoc).subscribe( data => {
            this.cliente = data;
            if(data === null) this.mostrarCliente = false;
          })
      })
      this.mostrarCliente = true;
  }

  onBusquedaCliente( busqueda: BusquedaClientes ): void{
    console.log(busqueda);
  }

  regresar(){
    this.router.navigate(['/busqueda']);

  }

}
