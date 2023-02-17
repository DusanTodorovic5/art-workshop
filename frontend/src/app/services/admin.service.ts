import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
    uri = 'http://localhost:4000/admin';
    constructor(private http: HttpClient) { }
  
    login(username, password) {
      const data = {
        "username": username,
        "password": password
      };

      return this.http.post(`${this.uri}/login`, data);
    }
  }