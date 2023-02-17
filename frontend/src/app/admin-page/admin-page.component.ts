import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { User } from '../models/user.model';
import { AdminService } from '../services/admin.service';
import { UsersService } from '../services/user.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  user: User;
  users: Array<User>;
  constructor(private userService: UsersService,private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.get_users().subscribe((users: Array<User>)=>{
      this.users = users;
      for (var user of this.users) {
        this.get_image(user);
      }
    });
  }

  get_image(user: User) {
    this.userService.get_image(user.username).subscribe((response: Object)=> {
      console.log(response);
      if (!response["image"]) {
        user.image = null;
      } else {
        user.image = this.extension_from_char(response["image"].charAt(0)) + response["image"];
      }
      
    });
  }

  accept(user: User) {

  }

  decline(user: User) {
    
  }

  details(user: User){
    
  }


  extension_from_char(type) {
    if (type == '/') return "data:image/jpg;base64,"
    if (type == 'i') return "data:image/png;base64,"
    if (type == 'U') return "data:image/webp;base64,"
    return "";
  }

}
