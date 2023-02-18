import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { BecomeOrgComponent } from './become-org/become-org.component';
import { DetailWorkshopComponent } from './detail-workshop/detail-workshop.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { NewWorkshopComponent } from './new-workshop/new-workshop.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { WorkshopsComponent } from './workshops/workshops.component';

const routes: Routes = [
  {path: "", component:LandingComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "adminLogin", component: AdminLoginComponent},
  {path: "userProfile", component: ProfileComponent},
  {path: "workshopsPage", component: WorkshopsComponent},
  {path: "become_org", component: BecomeOrgComponent},
  {path: "detail_ws", component: DetailWorkshopComponent},
  {path: "admin_page", component: AdminPageComponent},
  {path: "new_workshop", component: NewWorkshopComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
