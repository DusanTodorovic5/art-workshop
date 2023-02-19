import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-new-workshop',
  templateUrl: './new-workshop.component.html',
  styleUrls: ['./new-workshop.component.css']
})
export class NewWorkshopComponent implements OnInit {
  name: string = "";
  date: string = "";
  place: string = "";
  description: string = "";
  long_description: string = "";
  max_number: number = 0;
  images: Array<string> = [];
  good_size: boolean = false;
  message: string = "";
  user: User;
  constructor(private workshopService: WorkshopService) { }

  ngOnInit(): void {
    
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  create_new() {
    var upload_images = [];
    for (let img of this.images) {
      upload_images.push(img.replace(/^data:image\/[a-z]+;base64,/, ""));
    }
    this.workshopService.create_workshop(
      this.name, 
      new Date(this.date), 
      this.place, 
      this.description, 
      this.long_description, 
      this.max_number, 
      this.user.username,
      upload_images
    ).subscribe((res: Object) =>{
      console.log(res);
      if (res["message"]) {
        this.message = res["message"];
        if (this.message == "success") {
          alert("Succes! Wait for admin to approve");
        }
      }
    });
  }

  processFile(fileInput: any) {
    if (fileInput.target.files) {
      this.images = [];
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


      for (let i = 0; i < fileInput.target.files.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(fileInput.target.files[i]);
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

              this.images.push(imgBase64Path);
              this.good_size = true;
            }
            return true;
          };
        };
      }

    }

    return true;
  }


  display_image(image) {
    return this.extension_from_char(image.charAt(0)) + image;
  }

  extension_from_char(type) {
    if (type == '/') return "data:image/jpg;base64,"
    if (type == 'i') return "data:image/png;base64,"
    if (type == 'U') return "data:image/webp;base64,"
    return "";
  }

  remove_image(image) {
    var index = this.images.indexOf(image);
    if (index !== -1) {
      this.images.splice(index, 1);
    }
  }

  loadTemplate(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const res = JSON.parse(e.target.result);
        this.name = res.name;
        this.date = res.date;
        this.place = res.place;
        this.description = res.description;
        this.long_description = res.long_description;
        this.max_number = res.max_number;
        this.images = res.images;
      };

      reader.readAsText(fileInput.target.files[0]);

    }

    return true;
  }
}
