import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { User } from '../models/user.model';
import { Workshop } from '../models/workshop.model';
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
  workshops: Array<Workshop>;
  constructor(private userService: UsersService,private adminService: AdminService,private router: Router) { }

  ngOnInit(): void {
    this.adminService.get_users().subscribe((users: Array<User>)=>{
      this.users = users;
      for (var user of this.users) {
        this.get_image(user);
      }
    });
    this.adminService.get_all_workshops().subscribe((wss: Array<Workshop>)=>{
      this.workshops = [];
      for (let w of wss) {
        w.main_icon = this.extension_from_char(w.main_icon.charAt(0)) + w.main_icon;
        const old_icons = w.icons;
        w.icons = [];
        for (let icon of old_icons) {
          icon = this.extension_from_char(icon.charAt(0)) + icon;
          w.icons.push(icon);
        }
        this.workshops.push(w);
      }
    });
  }

  get_image(user: User) {
    this.userService.get_image(user.username).subscribe((response: Object)=> {
      if (!response["image"]) {
        user.image = null;
      } else {
        user.image = this.extension_from_char(response["image"].charAt(0)) + response["image"];
      }
      
    });
  }

  accept(user: User) {
    this.adminService.accept_user(
      user.username
    ).subscribe((res: Object) =>{
      if (res["message"] == "success") {
        user.status = "active";
      }
    });
  }

  decline(user: User) {
    this.adminService.reject_user(user.username).subscribe((res: Object) =>{
      if (res["message"] == "success") {
        user.status = "rejected";
      }
    });
  }

  delete(user: User) {
    this.adminService.delete_user(user.username).subscribe((res: Object) =>{
      if (res["message"] == "success") {
        var index = this.users.indexOf(user);
        if (index !== -1) {
          this.users.splice(index, 1);
        }
      }
    });
  }
  

  details(user: User){
    localStorage.setItem("update_user",JSON.stringify(user));
    this.router.navigate(["admin_users_page"]);
  }

  extension_from_char(type) {
    if (type == '/') return "data:image/jpg;base64,"
    if (type == 'i') return "data:image/png;base64,"
    if (type == 'U') return "data:image/webp;base64,"
    return "";
  }


  acceptw(ws: Workshop) {
    this.adminService.accept_workshop(
      ws.name
    ).subscribe((res: Object) =>{
      console.log(res);
      if (res["message"] == "success") {
        ws.status = "active";
      }
    });
  }

  declinew(ws: Workshop) {
    this.adminService.reject_workshop(ws.name).subscribe((res: Object) =>{
      console.log(res);
      if (res["message"] == "success") {
        ws.status = "rejected";
      }
    });
  }
  

  detailsw(workshop: Workshop){
    localStorage.setItem("update_workshop",JSON.stringify(workshop));
    this.router.navigate(["admin_workshops_page"]);
  }

  deletesw(ws: Workshop){
    this.adminService.delete_workshop(ws.name).subscribe((res: Object) =>{
      if (res["message"] == "success") {
        var index = this.workshops.indexOf(ws);
        if (index !== -1) {
          this.workshops.splice(index, 1);
        }
      }
    });
  }
}
