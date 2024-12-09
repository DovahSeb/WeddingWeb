import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfirmInvitation } from '../interfaces/IInvitation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class InvitationService {

  private readonly apiUrl = 'http://api.margot-et-sebastien.com';
  private http = inject(HttpClient);

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  confirmInvitation(confirmInvitation: ConfirmInvitation): Observable<any>{
    return this.http.put(`${this.apiUrl}/ConfirmationInviation`, confirmInvitation, this.httpOptions);
  }

  isValidConfirmationCode(code: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/IsValidInvitationCode?code=${code}`);
  }

}
