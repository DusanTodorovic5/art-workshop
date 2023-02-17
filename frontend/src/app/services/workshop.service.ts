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

    get_comments() {

    }
  }