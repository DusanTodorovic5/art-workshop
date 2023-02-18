import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {
    uri = 'http://localhost:4000/workshops';
    constructor(private http: HttpClient) { }
  
    get(){
        return this.http.get(`${this.uri}/get`);
    }

    like() {

    }

    unlike() {

    }

    comment() {

    }

    get_comments(workshop) {
      const data = {
        "workshop": workshop
      };

      return this.http.post(`${this.uri}/get_comments`, data);
    }

    get_attended(username) {
      const data = {
        "username": username
      };

      return this.http.post(`${this.uri}/get_attended`, data);
    }

    get_comments_for_user(username) {
      const data = {
        "username": username
      };

      return this.http.post(`${this.uri}/get_comments_for_user`, data);
    }

    remove_me(username, workshop) {
      const data = {
        "username": username,
        "workshop": workshop
      };

      return this.http.post(`${this.uri}/remove_me`, data);
    }

    attend(username, workshop) {
      const data = {
        "username": username,
        "workshop": workshop
      };

      return this.http.post(`${this.uri}/attend`, data);
    }

    unasign_for(username, workshop) {
      const data = {
        "username": username,
        "workshop": workshop
      };

      return this.http.post(`${this.uri}/unasign_for`, data);
    }

    sign_for(username, workshop) {
      const data = {
        "username": username,
        "workshop": workshop
      };

      return this.http.post(`${this.uri}/sign_for`, data);
    }
  }