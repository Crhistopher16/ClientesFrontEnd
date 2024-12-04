import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from '../services/clientes.service';
import { BusquedaComponent } from './busqueda.component';

describe('BusquedaComponent', () => {
  let component: BusquedaComponent;
  let fixture: ComponentFixture<BusquedaComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockService: jasmine.SpyObj<ClientesService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockService = jasmine.createSpyObj('ClientesService', ['setBusqueda']);

    await TestBed.configureTestingModule({
      declarations: [BusquedaComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ClientesService, useValue: mockService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario correctamente', () => {
    expect(component.clientForm).toBeTruthy();
    expect(component.clientForm.controls['tipoDocumento']).toBeDefined();
    expect(component.clientForm.controls['numeroDocumento']).toBeDefined();
  });

  it('debe validar el formulario correctamente', () => {
    const form = component.clientForm;
    form.controls['tipoDocumento'].setValue('');
    form.controls['numeroDocumento'].setValue('');
    expect(form.valid).toBeFalse();

    form.controls['tipoDocumento'].setValue('C');
    form.controls['numeroDocumento'].setValue('1234567890');
    expect(form.valid).toBeTrue();
  });

  it('debe navegar y llamar al servicio en emitBusqueda si número de documento es válido', () => {
    component.busqueda = {
      tipoDocumento: 'C',
      numeroDocumento: '1234567890'
    };

    component.emitBusqueda();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/visualizacion']);
    expect(mockService.setBusqueda).toHaveBeenCalledWith(component.busqueda);
  });

  it('no debe navegar ni llamar al servicio si número de documento está vacío', () => {
    component.busqueda = {
      tipoDocumento: 'C',
      numeroDocumento: ''
    };

    component.emitBusqueda();

    expect(mockRouter.navigate).not.toHaveBeenCalled();
    expect(mockService.setBusqueda).not.toHaveBeenCalled();
  });
});
