import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AdminService } from '../services/admin.service';
import { UsersService } from '../services/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private adminService: AdminService, 
      private userService: UsersService, 
      private router: Router) { }

  username: string = "";
  password: string = "";
  message: string = "";

  ngOnInit(): void { }

  extension_from_char(type) {
    if (type == '/') return "data:image/jpg;base64,"
    if (type == 'i') return "data:image/png;base64,"
    if (type == 'U') return "data:image/webp;base64,"
    return "";
  }

  login() {
    this.adminService.login(this.username, this.password).subscribe((user: User)=>{
      if (!user) {
        this.message = "Wrong password, username or type";
      } else {
        this.message = "";
        this.userService.get_image(user.username).subscribe((response: Object)=> {
          if (!response["image"]) {
            user.image = null;
          } else {
            user.image = this.extension_from_char(response["image"].charAt(0)) + response["image"];
          }
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(["admin_page"]);
        });
      }
    });
  }
}
