import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { tokenNotExpired } from "angular2-jwt";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

@Injectable()
export class AuthService {
  authToken: any;
  patient: any;
  constructor(private http: Http) {}

  registerPatient(patient) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post("http://localhost:5000/api/patients/register", patient, {
        headers: headers
      })
      .map(res => res.json());
  }

  authenticatePatient(patient) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post("http://localhost:5000/api/patients/login", patient, {
        headers: headers
      })
      .map(res => res.json());
  }

  storePatientData(token) {
    localStorage.setItem("id_token", token);
    //localStorage.setItem('patient', JSON.stringify(patient));
    this.authToken = token;
    //this.patient = patient;
  }

  loggedIn() {
    return tokenNotExpired("id_token");
  }
  logout() {
    this.authToken = null;
    //this.patient = null;
    localStorage.clear();
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append("Content-Type", "application/json");
    return this.http
      .get("http://localhost:5000/api/profile", {
        headers: headers
      })
      .map(res => res.json());
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}
