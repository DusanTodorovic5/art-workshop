import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { BecomeOrgComponent } from './become-org/become-org.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
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
  {path: "become_org", component: BecomeOrgComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
