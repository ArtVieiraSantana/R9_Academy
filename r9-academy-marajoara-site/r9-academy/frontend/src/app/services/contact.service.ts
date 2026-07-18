import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ContactRequest, ContactResponse } from '../models/contact-request.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly apiUrl = `${environment.apiUrl}/api/contato`;

  constructor(private http: HttpClient) {}

  enviar(dados: ContactRequest): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(this.apiUrl, dados);
  }
}
