import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClientesService } from './clientes.service';
import { environment } from '../environments/environments';
import { Cliente } from '../interfaces/Cliente.interface';
import { BusquedaClientes } from '../interfaces/BusquedaClientes.interface';

describe('ClientesService', () => {
  let service: ClientesService;
  let httpMock: HttpTestingController;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClientesService]
    });

    service = TestBed.inject(ClientesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe actualizar el observable `busquedaCliente` al llamar `setBusqueda`', () => {
    service.setBusqueda(mockBusqueda);
    service.busqueda$.subscribe((data) => {
      expect(data).toEqual(mockBusqueda);
    });
  });

  it('debe realizar una solicitud HTTP en `getCliente` y devolver un cliente', () => {
    service.getCliente(mockBusqueda.numeroDocumento, mockBusqueda.tipoDocumento).subscribe((cliente) => {
      expect(cliente).toEqual(mockCliente);
    });

    const req = httpMock.expectOne(
      `${environment.baseUrl}clientes?numeroDocumento=123456789&tipoDocumento=C`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockCliente); // Simula una respuesta de éxito del servidor
  });

  it('debe manejar errores correctamente en `getCliente`', () => {
    service.getCliente(mockBusqueda.numeroDocumento, mockBusqueda.tipoDocumento).subscribe((cliente) => {
      expect(cliente).toBeNull();
    });

    const req = httpMock.expectOne(
      `${environment.baseUrl}clientes?numeroDocumento=123456789&tipoDocumento=C`
    );
    expect(req.request.method).toBe('GET');
    req.flush(null, { status: 404, statusText: 'Not Found' }); // Simula un error 404
  });

  it('debe manejar un error desconocido en el método privado `errors`', () => {
    const errorResponse = {
      status: 503,
      statusText: 'Service Unavailable'
    };

    service.getCliente(mockBusqueda.numeroDocumento, mockBusqueda.tipoDocumento).subscribe((cliente) => {
      expect(cliente).toBeNull();
    });

    const req = httpMock.expectOne(
      `${environment.baseUrl}clientes?numeroDocumento=123456789&tipoDocumento=C`
    );
    req.flush(null, errorResponse);
  });
});
