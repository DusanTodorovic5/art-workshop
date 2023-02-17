import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
    uri = 'http://localhost:4000/users';
    constructor(private http: HttpClient) { }
  
    login(username, password, type) {
      const data = {
        "username": username,
        "password": password,
        "type": type
      };

      return this.http.post(`${this.uri}/login`, data);
    }

    password_change(username, password, new_password) {
      const data = {
        "username": username,
        "password": password,
        "new_password": new_password
      };

      return this.http.post(`${this.uri}/password_change`, data);
    }

    forgot_password(email) {
      const data = {
        "email": email
      };

      return this.http.post(`${this.uri}/forgot_password`, data);
    }

    register(name, surname, username, password, number, email, type, image, org) {
      const data = {
        "name": name,
        "surname": surname,
        "username": username,
        "password": password,
        "number": number,
        "email": email,
        "type": type,
        "image": image,
        "org" : org
      };

      return this.http.post(`${this.uri}/register`, data);
    }

    update(username, name, surname, number, email, image) {
      const data = {
        "username" : username,
        "name": name,
        "surname": surname,
        "number": number,
        "email": email,
        "image": image,
      }

      return this.http.post(`${this.uri}/update`, data);
    }

    get_image(username) {
      const data = {
        "username": username
      };

      return this.http.post(`${this.uri}/get_image`, data);
    }

    actions(username) {
      const data = {
        "username": username
      };

      return this.http.post(`${this.uri}/actions`, data);
    }
  }