import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UsersService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UsersService,private router: Router) { }

  username: string = "";
  password: string = "";
  type: string = "user";
  message: string = "";

  ngOnInit(): void {
  }

  extension_from_char(type) {
    if (type == '/') return "data:image/jpg;base64,"
    if (type == 'i') return "data:image/png;base64,"
    if (type == 'U') return "data:image/webp;base64,"
    return "";
  }

  login() {
    this.userService.login(this.username, this.password, this.type).subscribe((user: User)=>{
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
          this.router.navigate([""]);
        });
      }
    });
  }
}
