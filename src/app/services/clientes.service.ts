import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Cliente } from '../interfaces/Cliente.interface';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { BusquedaClientes } from '../interfaces/BusquedaClientes.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  private busquedaCliente = new BehaviorSubject<any>(null);
  public busqueda$ = this.busquedaCliente.asObservable();

  public cliente = signal<Cliente|null>(null);

  constructor() { }

  setBusqueda(busqueda: BusquedaClientes): void {
    this.busquedaCliente.next(busqueda);
  }

  getCliente(numeroDoc: string, tipoDoc: string){
    return this.http.get<Cliente>(`${this.baseUrl}clientes?numeroDocumento=${numeroDoc}&tipoDocumento=${tipoDoc}`).pipe(
      catchError(this.errors)
    )
  }

  private errors(error: HttpErrorResponse): Observable<Cliente | null> {
    if (error.status === 404 || error.status === 400 || error.status === 500) {
      console.error(`Error del BackEnd: ${error.status}`, error.error);
      return of(null);
    }
    return of(null);
  }

}
