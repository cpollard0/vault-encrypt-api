import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs"
@Injectable({
  providedIn: 'root'
})
export class APIService {
  // need to figure out a way to dynamically set this
  api_base = "https://42zy2ihep5.execute-api.us-east-1.amazonaws.com/LATEST"
  constructor(private http: HttpClient) { }

  VaultEncryptSecret(secret: String, application: String, environment: String): Observable<any>
  {
    var event = {"application":"chris_new_app4", "env":"preprd", "secret": secret};
    const httpOptions: { headers; observe; } = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*'
      }),
      observe: 'response'
    };
    return this.http.post(this.api_base + "/encrypt_secret", event, httpOptions);
  }
  GetApplicationList(): Observable<any>
  {
    const httpOptions: { headers; observe; } = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*'
      }),
      observe: 'response'
    };
    return this.http.get(this.api_base + "/vault_password", httpOptions);
  }
  GetEnvironmentsForApplication(application_name): Observable<any>
  {
    const httpOptions: { headers; observe; } = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*'
      }),
      observe: 'response'
    };
    return this.http.get(this.api_base + "/vault_password/" + application_name, httpOptions);
  }
}
