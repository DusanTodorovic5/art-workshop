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

  accept_user(username) {
    const data = {
      "username": username,
    };

    return this.http.post(`${this.uri}/accept_user`, data);
  }

  reject_user(username) {
    const data = {
      "username": username,
    };

    return this.http.post(`${this.uri}/reject_user`, data);
  }

  delete_user(username) {
    const data = {
      "username": username,
    };

    return this.http.post(`${this.uri}/delete_user`, data);
  }

  get_users() {
    return this.http.get(`${this.uri}/get_users`);
  }

  get_all_workshops() {
    return this.http.get(`${this.uri}/get_all_workshops`);
  }

  accept_workshop(workshop) {
    const data = {
      "workshop": workshop,
    };

    return this.http.post(`${this.uri}/accept_workshop`, data);
  }

  reject_workshop(workshop) {
    const data = {
      "workshop": workshop,
    };

    return this.http.post(`${this.uri}/reject_workshop`, data);
  }

  delete_workshop(workshop) {
    const data = {
      "workshop": workshop,
    };

    return this.http.post(`${this.uri}/delete_workshop`, data);
  }

}