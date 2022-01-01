import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CardDetails } from '../../models/card-details.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  baseURL: string = 'api'

  constructor(private http: HttpClient) { }

  getCardDetails(): CardDetails {
    return new CardDetails(1, '12345', 10);
  }

  issueCard(): CardDetails {
    return new CardDetails(1, '12345', 10);
  }

  topupCardBalance(): CardDetails {
    return new CardDetails(1, '12345', 10);
  }

  validatecard(cardNumber: string): Observable<any> {

    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*');


    return this.http.get(this.baseURL + 'card/' + cardNumber, { 'headers': headers });
  }

}
