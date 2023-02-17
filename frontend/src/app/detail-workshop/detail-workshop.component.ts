import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Workshop } from '../models/workshop.model';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-detail-workshop',
  templateUrl: './detail-workshop.component.html',
  styleUrls: ['./detail-workshop.component.css']
})
export class DetailWorkshopComponent implements OnInit {

  workshop: Workshop;
  user: User;
  message: string;
  constructor(private workshopService: WorkshopService) { }

  ngOnInit(): void {
    this.workshop = JSON.parse(localStorage.getItem("curr_workshop"));
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  avaliable() {
    if (!this.workshop || !this.user) {
      return false;
    }

    for (var s of this.workshop.attendees) {
      if (s == this.user.username) {
        return false;
      }
    }
    return true;
  }

  signin() {
    this.workshopService.attend(this.user.username, this.workshop.name).subscribe((res: Object) => {
      this.message = res["message"];
      if (this.message == "success") {
        this.workshop.attendees.push(this.user.username);
      }
    });
  }

  remove() {
    this.workshopService.remove_me(this.user.username, this.workshop.name).subscribe((res: Object) => {
      this.message = res["message"];
      if (this.message == "success") {
        var index = this.workshop.attendees.indexOf(this.user.username);
        if (index !== -1) {
          this.workshop.attendees.splice(index, 1);
        }
      }
    });
  }
}
