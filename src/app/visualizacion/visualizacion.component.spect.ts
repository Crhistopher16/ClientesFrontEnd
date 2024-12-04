import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { VisualizacionComponent } from './visualizacion.component';
import { ClientesService } from '../services/clientes.service';
import { Cliente } from '../interfaces/Cliente.interface';
import { BusquedaClientes } from '../interfaces/BusquedaClientes.interface';

describe('VisualizacionComponent', () => {
  let component: VisualizacionComponent;
  let fixture: ComponentFixture<VisualizacionComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockService: jasmine.SpyObj<ClientesService>;

  const mockCliente: Cliente = {
    numeroDocumento: '123456789',
    primerNombre: 'Juan',
    segundoNombre: 'Carlos',
    primerApellido: 'Pérez',
    segundoApellido: 'Gómez',
    telefono: '1234567890',
    direccion: 'Calle 123',
    ciudadResidencia: 'Bogotá'
  };

  const mockBusqueda: BusquedaClientes = {
    tipoDocumento: 'C',
    numeroDocumento: '123456789'
  };

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockService = jasmine.createSpyObj('ClientesService', ['getCliente'], {
      busqueda$: of(mockBusqueda)
    });

    mockService.getCliente.and.returnValue(of(mockCliente));

    await TestBed.configureTestingModule({
      declarations: [VisualizacionComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ClientesService, useValue: mockService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar `busqueda` con datos del observable `busqueda$`', () => {
    expect(component.busqueda).toEqual(mockBusqueda);
  });

  it('debe llamar a `getCliente` y asignar datos al cliente', () => {
    expect(mockService.getCliente).toHaveBeenCalledWith('123456789', 'C');
    expect(component.cliente).toEqual(mockCliente);
    expect(component.mostrarCliente).toBeTrue();
  });

  it('debe establecer `mostrarCliente` en falso si no se encuentra el cliente', () => {
    mockService.getCliente.and.returnValue(of(null));
    component.ngOnInit();
    expect(component.mostrarCliente).toBeFalse();
  });

  it('debe navegar a la ruta de búsqueda al llamar `regresar`', () => {
    component.regresar();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/busqueda']);
  });

  it('debe registrar en consola al llamar `onBusquedaCliente`', () => {
    spyOn(console, 'log');
    component.onBusquedaCliente(mockBusqueda);
    expect(console.log).toHaveBeenCalledWith(mockBusqueda);
  });

  it('debe retornar etiquetas correctamente', () => {
    component.cliente = mockCliente;
    const etiquetas = component.etiquetas;
    expect(etiquetas.length).toBe(7);
    expect(etiquetas[0]).toEqual({ value: 'Juan', label: 'Primer Nombre' });
  });
});
