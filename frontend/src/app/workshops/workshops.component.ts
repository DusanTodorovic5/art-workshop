import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Workshop } from '../models/workshop.model';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.css']
})
export class WorkshopsComponent implements OnInit {

  workshops: Array<Workshop>;
  user : User;
  searchCriteriaName: string = "";
  searchCriteriaPlace: string = "";
  sortNameSwitch: boolean = true;
  sortDateSwitch: boolean = true;
  signed_for: Array<Workshop>;
  constructor(private workshopService: WorkshopService, private router: Router) { }

  ngOnInit(): void {
    this.user  = JSON.parse(localStorage.getItem("user"));
    this.workshopService.get().subscribe((workshops: Array<Workshop>)=>{
      this.workshops = workshops;
      this.signed_for = [];
      for (let w of this.workshops) {
        if (w.main_icon) {
          w.main_icon = this.extension_from_char(w.main_icon.charAt(0)) + w.main_icon;
        }
      }

      for (let w of workshops) {
        if (w.signed.includes(this.user.username)) {
          this.signed_for.push(w);
        }
      }
    });
  }


  extension_from_char(type) {
    if (type == '/') return "data:image/jpg;base64,"
    if (type == 'i') return "data:image/png;base64,"
    if (type == 'U') return "data:image/webp;base64,"
    return "";
  }

  sortByName() {
    this.sortNameSwitch = !this.sortNameSwitch;
    this.workshops.sort((w1 : Workshop, w2: Workshop) => {
      if (w1.name > w2.name) {
        return this.sortNameSwitch ? -1 : 1;
      } else if (w2.name > w1.name) {
        return this.sortNameSwitch ? 1 : -1;
      } 
      return 0;
    });
  }

  sortByDate() {
    this.sortDateSwitch = !this.sortDateSwitch;
    this.workshops.sort((w1 : Workshop, w2: Workshop) => {
      if (w1.date > w2.date) {
        return this.sortDateSwitch ? -1 : 1;
      } else if (w2.date > w1.date) {
        return this.sortDateSwitch ? 1 : -1;
      } 
      return 0;
    });
  }

  search() {
    this.workshopService.get().subscribe((workshops: Array<Workshop>)=>{
      this.workshops = [];
      for (let w of workshops) {
        if (w.name.toLowerCase().includes(this.searchCriteriaName.toLowerCase()) && 
            w.place.toLowerCase().includes(this.searchCriteriaPlace.toLowerCase())){
          if (w.main_icon) {
            w.main_icon = this.extension_from_char(w.main_icon.charAt(0)) + w.main_icon;
          }
          this.workshops.push(w);
        }
      }
    });
  }

  details(w: Workshop) {
    localStorage.setItem("curr_workshop", JSON.stringify(w));
    this.router.navigate(["detail_ws"]);
  }

  workshop_in(w: Workshop) {
    var date = new Date(w.date);
    var diff = date.getTime() - Date.now();
    var hours = Math.floor(diff / (1000 * 60 * 60));
    var days = Math.floor(hours/24);
    console.log(diff);
    if (days > 0) {
      return "In " + days + " days";
    }
    return "In " + hours + " hours";
  }

  unasignable(w: Workshop) {
    var date = new Date(w.date);
    var diff = date.getTime() - Date.now();
    var hours = Math.floor(diff / (1000 * 60 * 60));
    return hours > 12;
  }

  unassign(w: Workshop) {
    this.workshopService.unasign_for(this.user.username, w.name).subscribe((res: Object) => {
      if (res["message"] == "success") {
        var index = this.signed_for.indexOf(w);
        if (index !== -1) {
          this.signed_for.splice(index, 1);
        }
      }
    });
  }

}
