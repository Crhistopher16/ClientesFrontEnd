import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusquedaClientes } from '../interfaces/BusquedaClientes.interface';
import { Router } from '@angular/router';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent {

  public busqueda: BusquedaClientes = {
    tipoDocumento: '',
    numeroDocumento: ''
  }

  tipos: Array<{ value: string; label: string }> = [
    { value: 'C', label: 'Cédula de ciudadanía' },
    { value: 'P', label: 'Pasaporte' }
  ];

  public clientForm:FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private router: Router, private service: ClientesService) {
    this.clientForm = this.formBuilder.group({
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', [Validators.required, Validators.pattern('^.{10,15}$')]],
    });
  }


  emitBusqueda():void {
    // console.log(this.busqueda);
    if (this.busqueda.numeroDocumento.length === 0 ) return;

    this.router.navigate(['/visualizacion']);

    this.service.setBusqueda(this.busqueda);
  }


  message: string = "Hola Mundo!";
}
