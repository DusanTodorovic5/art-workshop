import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminNewUserComponent } from './admin-new-user/admin-new-user.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { BecomeOrgComponent } from './become-org/become-org.component';
import { ChatWorkshopComponent } from './chat-workshop/chat-workshop.component';
import { DetailWorkshopComponent } from './detail-workshop/detail-workshop.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { NewWorkshopComponent } from './new-workshop/new-workshop.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { UpdateWorkshopComponent } from './update-workshop/update-workshop.component';
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
  {path: "new_workshop", component: NewWorkshopComponent},
  {path: "workshop-chat", component: ChatWorkshopComponent},
  {path: "edit_ws", component: UpdateWorkshopComponent},
  {path: "new_admin_user", component: AdminNewUserComponent},
  {path: "admin_users_page", component: AdminUsersComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
