import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UsersService } from '../services/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  user: User;
  message: string;
  image: string = null;
  good_size: boolean = false;
  name: string;
  surname: string;
  number: string;
  email: string;

  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("update_user"));
    if (this.user) {
      this.name = this.user.name;
      this.surname = this.user.surname;
      this.number = this.user.phone;
      this.email = this.user.email;
      this.image = this.user.image;
    }
  }

  set_image(message, usr) {
    this.userService.get_image(usr).subscribe((response: Object) => {
      if (!response["image"]) {
        message.image = null;
      } else {
        message.image = this.extension_from_char(response["image"].charAt(0)) + response["image"];
      }
    });
  }


  update() {
    if (this.image != this.user.image && !this.good_size) {
      return;
    }

    this.image = this.image.replace(/^data:image\/[a-z]+;base64,/, "");
    this.userService.update(this.user.username, this.name, this.surname, this.number, this.email, this.image).subscribe((user: Object) => {
      this.message = user["message"];
      if (this.message == "success") {
        this.user.name = this.name;
        this.user.surname = this.surname;
        this.user.phone = this.number;
        this.user.email = this.email;
        this.user.image = this.image;
        // localStorage.setItem("user", JSON.stringify(this.user));
      }
    });
  }

  processFile(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 300;
      const max_width = 300;
      const min_height = 100;
      const min_width = 100;

      if (fileInput.target.files[0].size > max_size) {
        this.message =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          if (img_height > max_height && img_width > max_width) {
            this.message =
              'Maximum dimensions allowed ' +
              max_height + '*' + max_width + 'px';
            this.good_size = false;
            return false;
          } else if (img_height < min_height && img_width > min_width) {
            this.message =
              'Maximum dimensions allowed ' +
              min_height + '*' + min_width + 'px';
            this.good_size = false;
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.image = imgBase64Path;
            this.good_size = true;
          }
          return true;
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);

    }

    return true;
  }

  extension_from_char(type) {
    if (type == '/') return "data:image/jpg;base64,"
    if (type == 'i') return "data:image/png;base64,"
    if (type == 'U') return "data:image/webp;base64,"
    return "";
  }
}
