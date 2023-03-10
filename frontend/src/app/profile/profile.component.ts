import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommentModel } from '../models/comment.model';
import { Chat, Message } from '../models/message.model';
import { User } from '../models/user.model';
import { Workshop } from '../models/workshop.model';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { UsersService } from '../services/user.service';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  message: string;
  image: string = null;
  good_size: boolean = false;
  name: string;
  surname: string;
  number: string;
  email: string;

  sortNameSwitch: boolean;
  sortPlaceSwitch: boolean;
  sortDateSwitch: boolean;
  atended: Array<Workshop>;
  comments: Array<CommentModel>;

  current_password: string = "";
  new_password1: string = "";
  new_password2: string = "";
  message_password: string = "";
  ws: WebSocket;
  messages: Array<Chat>;
  my_workshops : Array<Workshop>;
  @ViewChild(NavigationBarComponent) child: NavigationBarComponent;
  constructor(private workshopService: WorkshopService, private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user) {
      this.name = this.user.name;
      this.surname = this.user.surname;
      this.number = this.user.phone;
      this.email = this.user.email;
      this.image = this.user.image;
      this.set_up_ws();

      this.workshopService.get_attended(this.user.username).subscribe((workshops: Array<Workshop>) => {
        this.atended = workshops;
        for (let w of this.atended) {
          if (w.main_icon) {
            w.main_icon = this.extension_from_char(w.main_icon.charAt(0)) + w.main_icon;
          }
        }
      });
      this.workshopService.get_comments_for_user(this.user.username).subscribe((comments: Array<CommentModel>) => {
        this.comments = comments;
      });

      if (this.user.type != 'user') {
        this.workshopService.get_mine(this.user.username).subscribe((workshops: Array<Workshop>) => {
          this.my_workshops = workshops;
          for (let w of this.my_workshops) {
            if (w.main_icon) {
              w.main_icon = this.extension_from_char(w.main_icon.charAt(0)) + w.main_icon;
            }
          }
        });
      }
    }
  }

  set_up_ws() {
    this.ws = new WebSocket("ws://localhost:4001/");
      this.ws.onopen = (evt) => {
        this.ws.send("{\"username\":\"" + this.user.username + "\"}");
      }
      this.ws.onmessage = (msg) => {
        var payload = JSON.parse(msg.data);
        if (Array.isArray(payload)) {
          this.messages = payload;
          for (var message of this.messages) {
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
    this.ws.send(JSON.stringify({
      "from": this.user.username,
      "to": this.user.username == chat.users[0] ? chat.users[1] : chat.users[0],
      "text": chat.current_message
    }));
    chat.current_message = "";
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
        this.user.image = this.extension_from_char(this.image.charAt(0)) + this.image;
        localStorage.setItem("user", JSON.stringify(this.user));
        this.child.update_user();
      }
    });
  }

  update_password() {
    if (this.new_password1 != this.new_password2) {
      this.message_password = "Password entered do not match!";
      return;
    }

    this.userService.password_change(this.user.username, this.current_password, this.new_password1).subscribe((user: Object) => {
      this.message_password = user["message"];
      if (this.message_password == "success") {
        localStorage.clear();
        this.router.navigate(["login"]);
      }
    });
  }

  sortByName() {
    this.sortNameSwitch = !this.sortNameSwitch;
    this.atended.sort((w1: Workshop, w2: Workshop) => {
      if (w1.date > w2.date) {
        return this.sortNameSwitch ? -1 : 1;
      } else if (w2.date > w1.date) {
        return this.sortNameSwitch ? 1 : -1;
      }
      return 0;
    });
  }

  sortByPlace() {
    this.sortPlaceSwitch = !this.sortPlaceSwitch;
    this.atended.sort((w1: Workshop, w2: Workshop) => {
      if (w1.date > w2.date) {
        return this.sortPlaceSwitch ? -1 : 1;
      } else if (w2.date > w1.date) {
        return this.sortPlaceSwitch ? 1 : -1;
      }
      return 0;
    });
  }

  sortByDate() {
    this.sortDateSwitch = !this.sortDateSwitch;
    this.atended.sort((w1: Workshop, w2: Workshop) => {
      if (w1.date > w2.date) {
        return this.sortDateSwitch ? -1 : 1;
      } else if (w2.date > w1.date) {
        return this.sortDateSwitch ? 1 : -1;
      }
      return 0;
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

  see_chats(workshop) {
    localStorage.setItem("chat_workshop", JSON.stringify(workshop));
    this.router.navigate(["workshop-chat"]);
  }
}
