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

  new_workshop() {
    this.router.navigate(["new_workshop"]);
  }

  admin_new_user() {
    this.router.navigate(["new_admin_user"]);
  }

  admin_new_ws() {
    this.router.navigate(["new_admin_ws"]);
  }

  admin_home() {
    this.router.navigate(["admin_page"]);
  }

  logout() {
    localStorage.clear();
    this.user = null;
    this.router.navigate(['login']);
  }
}
