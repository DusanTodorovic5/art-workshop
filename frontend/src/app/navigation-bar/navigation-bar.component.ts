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

  landing() {
    this.router.navigate([""]);
  }
  
  ngOnInit(): void { 
    this.user  = JSON.parse(localStorage.getItem("user"));
  }

  update_user(): void {
    this.user  = JSON.parse(localStorage.getItem("user"));
  }

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.router.navigate(["register"]);
  }

  profile() {
    this.router.navigate(["userProfile"]);
  }

  workshops() {
    this.router.navigate(["workshopsPage"]);
  }

  become_org() {
    this.router.navigate(["become_org"]);
  }

  logout() {
    localStorage.clear();
    this.user = null;
    this.router.navigate(['login']);
  }
}
