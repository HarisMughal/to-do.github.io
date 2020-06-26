import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    // Define API
    _url = 'http://localhost:3000';

    // Get server url                                                                                                          urk
    getServerURL() {
        return this._url;
    }

  constructor(private http: HttpClient) { }

  getTask(id){
    let x = this._url + "/getTask/"+id;
    // console.log("home init");
    // console.log(x);
    return this.http.get(x);
  }
  addTask(id,body){
    let x = this._url + "/addTask/"+id;
    // console.log("home init");
    // console.log(x);
    return this.http.post<any>(x,body);
  }


  editTask(id,body){
    let x = this._url + "/editTask/"+id;
    // console.log("home init");
    // console.log(x);
    return this.http.post<any>(x,body);
  }
  deleteTask(id,body){
    let x = this._url + "/deleteTask/"+id;
    // console.log("home init");
    // console.log(x);
    return this.http.post<any>(x,body);
  }
  
  login(body){
    let x = this._url + "/login";
    // console.log("home init");
    console.log(body);
    return this.http.post<any>(x,body);

  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
