import { Component, OnInit } from '@angular/core';
import { Chat, Message } from '../models/message.model';
import { User } from '../models/user.model';
import { Workshop } from '../models/workshop.model';
import { UsersService } from '../services/user.service';
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
  ws: WebSocket;
  messages: Array<Chat>;
  constructor(private workshopService: WorkshopService, private userService: UsersService) { }

  ngOnInit(): void {
    this.workshop = JSON.parse(localStorage.getItem("curr_workshop"));
    let ww = this.workshop.icons;
    this.workshop.icons = [];
    for (let w of ww) {
      this.workshop.icons.push(this.extension_from_char(w.charAt(0)) + w);
    }
    this.user = JSON.parse(localStorage.getItem("user"));
    this.set_up_ws();
  }

  avaliable() {
    if (!this.workshop || !this.user) {
      return false;
    }

    for (var s of this.workshop.signed) {
      if (s == this.user.username) {
        return false;
      }
    }
    return true;
  }

  signin() {
    this.workshopService.sign_for(this.user.username, this.workshop.name).subscribe((res: Object) => {
      this.message = res["message"];
      if (this.message == "success") {
        this.workshop.signed.push(this.user.username);
      }
    });
  }

  remove() {
    this.workshopService.unasign_for(this.user.username, this.workshop.name).subscribe((res: Object) => {
      this.message = res["message"];
      if (this.message == "success") {
        var index = this.workshop.signed.indexOf(this.user.username);
        if (index !== -1) {
          this.workshop.signed.splice(index, 1);
        }
      }
    });
  }

  set_up_ws() {
    this.ws = new WebSocket("ws://localhost:4001/");
      this.ws.onopen = (evt) => {
        this.ws.send("{\"username\":\"" + this.user.username + "\"}");
      }
      this.ws.onmessage = (msg) => {
        var payload = JSON.parse(msg.data);
        if (Array.isArray(payload)) {
          this.messages = [];
          for (var message of payload) {
            if (message.users.includes(this.user.username) && message.users.includes(this.workshop.organizer)) {
              message.messages.sort((w1: Message, w2: Message) => {
                if (w1.timestamp > w2.timestamp) {
                  return -1;
                } else if (w2.timestamp > w1.timestamp) {
                  return 1;
                }
                return 0;
              });
              message.current_message = "";
              message.opened = false;
              for (var usr of message.users) {
                if (usr != this.user.username) {
                  this.set_image(message, usr);
                }
              }
              this.messages.push(message);
            }
          }
          if (this.messages.length == 0) {
            var new_chat = new Chat();
            new_chat.opened = false;
            new_chat.users = [this.user.username, this.workshop.organizer];
            new_chat.messages = [];
            this.set_image(new_chat, payload["from"]);
            this.messages.push(new_chat);
            return;
          }
          return;
        } else {
          var result = this.messages.findIndex(chat => {
            return chat.users.includes(payload.from) && chat.users.includes(payload.to);
          });
          const arr = this.messages;
          this.messages = [];
          if (result == -1) {
            var new_chat = new Chat();
            new_chat.opened = false;
            new_chat.users = [this.user.username, payload["from"]];
            new_chat.messages = [];
            new_chat.messages.push(payload);
            this.set_image(new_chat, payload["from"]);
            arr.push(new_chat);
            this.messages = arr;
            return;
          }
          arr[result].messages.splice(0, 0, payload);
          this.messages = arr;
        }
      }
  }

  print_date(timestamp) {
    var seconds = Math.floor(new Date().getTime() / 1000 - timestamp);

    var interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    return "Today";
  }
  open_chat(chat: Chat) {
    chat.opened = !chat.opened;
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

  send_message(chat: Chat) {
    if (!this.workshop.chated.includes(this.user.username)){
      this.workshopService.chat_on_workshop(this.user.username, this.workshop.name).subscribe((res: Object) => {
        console.log(res);
        if (res["message"] == "success") {
          this.workshop.chated.push(this.user.username);
        }
      });
    }
    this.ws.send(JSON.stringify({
      "from": this.user.username,
      "to": this.user.username == chat.users[0] ? chat.users[1] : chat.users[0],
      "text": chat.current_message
    }));
    chat.current_message = "";
  }

  extension_from_char(type) {
    if (type == '/') return "data:image/jpg;base64,"
    if (type == 'i') return "data:image/png;base64,"
    if (type == 'U') return "data:image/webp;base64,"
    return "";
  }
}
