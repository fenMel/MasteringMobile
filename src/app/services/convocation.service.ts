import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ConvocationService {
  private apiUrl = environment.url + '/users/send/mail_convocation';

  constructor(private http: HttpClient, private authSevice : AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.authSevice.getToken()
    });
  }

  envoyerConvocation(dto: any) {
    return this.http.post(this.apiUrl, dto, {
      headers: this.getAuthHeaders()
  }
    );
    }
}
