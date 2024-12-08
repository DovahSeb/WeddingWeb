import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfirmInvitation } from '../interfaces/IInvitation';

@Injectable({
  providedIn: 'root'
})

export class InvitationService {

  private readonly apiUrl = 'http://api.margot-et-sebastien.com/api/ConfirmInvitation';
  private http = inject(HttpClient);

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  confirmInvitation(confirmInvitation: ConfirmInvitation){
    this.http.put(this.apiUrl, confirmInvitation, this.httpOptions);
  }

}
