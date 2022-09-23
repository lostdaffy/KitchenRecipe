import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';


import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private ROOT_URL = "http://localhost:3000";



  constructor(private _http: HttpClient, private _router: Router, private toast: NgToastService) { }

  register(body: any) {
    return this._http.post(`${this.ROOT_URL}/register`, body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }

  contact(body: any) {
    return this._http.post(`${this.ROOT_URL}/contact`, body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }

  login(data: any): Observable<any> {
    return this._http.post(`${this.ROOT_URL}/login`, data);
  }

  logOut() {
    localStorage.removeItem("token");
    this.toast.info({ detail: "LOGOUT", summary: 'Logout Successfuly', duration: 4000 });
    this._router.navigate(["/home"]);
  }

  loggedIn() {
    return !!localStorage.getItem("token");
  }

  // Get all objects
  getAllrecipe() {
    return this._http.get(`${this.ROOT_URL}/RecipeData`);
  }


  deleteRecipe(id: string) {
    return this._http.delete(`${this.ROOT_URL}/deleteRecipe/${id}`);
  }

}


