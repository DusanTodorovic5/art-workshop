import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  user : User;

  constructor(private router: Router) { 
  }
  
  ngOnInit(): void { 
    this.user  = JSON.parse(localStorage.getItem("user"));
  }

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.router.navigate(["register"]);
  }

  logout() {
    localStorage.clear();
    this.user = null;
  }
}
