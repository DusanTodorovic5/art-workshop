import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './register/register.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ProfileComponent } from './profile/profile.component';
import { WorkshopsComponent } from './workshops/workshops.component';
import { BecomeOrgComponent } from './become-org/become-org.component';
import { DetailWorkshopComponent } from './detail-workshop/detail-workshop.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { NewWorkshopComponent } from './new-workshop/new-workshop.component';
import { ChatWorkshopComponent } from './chat-workshop/chat-workshop.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    LoginComponent,
    LandingComponent,
    RegisterComponent,
    AdminLoginComponent,
    ProfileComponent,
    WorkshopsComponent,
    BecomeOrgComponent,
    DetailWorkshopComponent,
    AdminPageComponent,
    NewWorkshopComponent,
    ChatWorkshopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
