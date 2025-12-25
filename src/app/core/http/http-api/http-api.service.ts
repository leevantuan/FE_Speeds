import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from '../session-storage/session-storage.service';
import { environment } from '../../../../environments/env.dev';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpApiService {
  baseUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private sessionStorageService: SessionStorageService,
  ) {}

  public get header(): HttpHeaders {
    const token = this.sessionStorageService.getItem('accessToken')?.toString();

    let headers = new HttpHeaders({
      Accept: '*/*',
      'Content-Type': 'application/json',
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  /**Get request */
  get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(this.baseUrl + url, { headers: this.header });
  }

  /**Post request */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post<T>(url: string, body: any): Observable<T> {
    return this.httpClient.post<T>(this.baseUrl + url, body, {
      headers: this.header,
    });
  }

  /**Put request */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put<T>(url: string, body: any): Observable<T> {
    return this.httpClient.put<T>(this.baseUrl + url, body, {
      headers: this.header,
    });
  }

  /**Delete request */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete<T>(url: string, body: any): Observable<T> {
    return this.httpClient.delete<T>(this.baseUrl + url, {
      headers: this.header,
      body: body,
    });
  }
}
