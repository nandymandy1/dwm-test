import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityProvider } from '../utility/utility';
import { DataProvider } from '../data/data';
import { catchError, tap, retry } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { _throw } from 'rxjs/observable/throw'
import { Constant } from '../../constants/constant';

@Injectable()
export class NetworkProvider {
  headers: HttpHeaders;
  httpOptions: any;
  header1: { 'Content-Type': string; };

  token: any;
  profile: any;
  pay: any;
  Details: any;
  constructor(public storage: Storage, private http: HttpClient, public utility: UtilityProvider, public dataProvider: DataProvider, private dataService: DataProvider) {
    console.log('Hello NetworkProvider Provider');
    // this.storage.get('loginDetails').then((data) => {
    //   if(data){
    //   this.Details = data;
    //   this.pay = this.Details.payload;
    //   this.token = this.pay.token;
    //   console.log("log...Details", JSON.stringify(this.token))
    // }
    // })
   this.token= this.dataProvider.getUserSessionToken()
  }

  userLogin(dataUrl, jsonData, params?: Object) {
    let body = JSON.stringify(jsonData);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options;
    if (params) {
      let sParams: HttpParams = new HttpParams();
      for (var key in params) {
        sParams = sParams.append(key, params[key]);
      }
      options = {
        headers: headers,
        params: sParams
      };
    } else {
      options = { headers: headers };
    }

    return this.http.post(dataUrl, body, options)
      .pipe(
        tap(res => console.log("res", res)),

        tap(res => console.log("login details....", res)),
      //  catchError(this.handleError('posted data'))
    )
  }


  getData(dataUrl,jsonData, params?: Object) {
    this.profile = jsonData;
    console.log("profile.",this.profile.token)
    this.token = this.profile.token;
    console.log(" this.token", this.token)
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Basic ' + this.token });
    let httpOptions;
    if (params) {
      let sParams: HttpParams = new HttpParams();
      for (var key in params) {
        sParams = sParams.append(key, params[key]);
      }
      httpOptions = {
        headers: headers,
        params: sParams
      };
    } else {
      httpOptions = {
        headers: headers
      };
    }
    return this.http.get(dataUrl, httpOptions).pipe(
      tap(res => console.log("res", res)),
      catchError(this.handleError('data fetched'))
    )
  }
  getAuditDataData(dataUrl, params?: Object) {
    this.profile= this.dataProvider.getUserSessionToken()
    //  this.token = data.payload.token;
    this.token = this.profile.payload.token;
      console.log("***this.token", this.token)
     this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Basic ' + this.token });
     
      this.httpOptions;
      if (params) {
        let sParams: HttpParams = new HttpParams();
        for (var key in params) {
          sParams = sParams.append(key, params[key]);
        }
        this.httpOptions = {
          headers: this.headers,
          params: sParams
        };
      } else {
        this.httpOptions = {
          headers: this.headers
        };
      }
     
    return this.http.get(dataUrl, this.httpOptions).pipe(
      tap(res => console.log("res", res)),
      catchError(this.handleError('data fetched'))
    )
  }

  checkAppUpdate(dataUrl, jsonData, params?: Object){
    let body = JSON.stringify(jsonData);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options;
    if (params) {
      let sParams: HttpParams = new HttpParams();
      for (var key in params) {
        sParams = sParams.append(key, params[key]);
      }
      options = {
        headers: headers,
        params: sParams
      };
    } else {
      options = { headers: headers };
    }

    return this.http.post(dataUrl, body, options)
      .pipe(
        tap(res => console.log("res", res)),
        catchError(this.handleError('posted data'))
      )
 }
  postData(dataUrl, jsonData, params?: Object) {
    this.profile = this.dataProvider.getUserSessionToken();
    this.token = this.profile.payload.token;
    console.log(" this.token", this.token)
    let body = JSON.stringify(jsonData);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Basic ' + this.token });
    let options;
    if (params) {
      let sParams: HttpParams = new HttpParams();
      for (var key in params) {
        sParams = sParams.append(key, params[key]);
      }
      options = {
        headers: headers,
        params: sParams
      };
    } else {
      options = { headers: headers };
    }

    return this.http.post(dataUrl, body, options)
      .pipe(
        tap(res => console.log("res", res)),
        catchError(this.handleError('posted data'))
      )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // alert(error)
      console.error('An error occurred:', error.error);
     // this.utility.showAlert(error.error.message);
      return _throw(error)
    };
  }
}
