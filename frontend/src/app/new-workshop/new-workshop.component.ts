import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-workshop',
  templateUrl: './new-workshop.component.html',
  styleUrls: ['./new-workshop.component.css']
})
export class NewWorkshopComponent implements OnInit {
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
  constructor() { }

  ngOnInit(): void {
  }

  register() {
    
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
