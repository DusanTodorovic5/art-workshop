import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UsersService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string = "";
  surname: string = "";
  username: string = "";
  password: string = "";
  again_password: string = "";
  number: string = "";
  email: string = "";
  image: string = "";
  good_size: boolean = false;
  type: string = "";
  message: string = "";
  //org.name || !org.address || !org.number
  org_name: string = null;
  org_address: string = null;
  org_number: string = null;
  constructor(private userService: UsersService,private router: Router) { }

  ngOnInit(): void {
    // name, surname, username, password, number, email, type, image
  }

  register() {
    if (this.image != "" && !this.good_size) {
      return;
    }

    if (this.password != this.again_password) {
      this.message = "Passwords do not match!";
      return;
    }
    this.image = this.image.replace(/^data:image\/[a-z]+;base64,/, "");
    this.userService.register(
      this.name, 
      this.surname, 
      this.username, 
      this.password, 
      this.number, 
      this.email, 
      this.type, 
      this.image, 
      {
        "name": this.org_name,
        "address": this.org_address,
        "number": this.number
      }
    ).subscribe((res: Object) =>{
      console.log(res);
      if (res["message"]) {
        this.message = res["message"];
        if (this.message == "success") {
          alert("Succes! Wait for admin to approve");
          this.router.navigate([""]);
        }
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
}
