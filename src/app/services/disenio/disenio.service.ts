import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Disenio } from 'src/app/models/disenio.model';
import { Observable } from 'rxjs/internal/Observable';

const base_url = 'http://localhost:8080/api';
@Injectable({
  providedIn: 'root'
})
export class DisenioService {

  constructor(private http:HttpClient) { }

  public cargarDisenios(){
    const url=`${base_url}/disenio/listar`;
    
    return this.http.get<Disenio[]>(url);
  }

  public registrarDisenio(disenio:any):Observable<Disenio>{
    let diseni:Disenio= new Disenio();

    console.log("data: "+disenio);
    diseni.diseno = disenio;
    console.log(diseni.diseno);
    
    const url=`${base_url}/disenio/registrar`;
    return this.http.post<Disenio>(url,diseni)

  }

}
