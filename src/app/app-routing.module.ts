import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageVolunteerComponent } from './manage-volunteer/manage-volunteer.component';
import { CreateVolunteerComponent } from './create-volunteer/create-volunteer.component';
import { EditVolunteerComponent } from './edit-volunteer/edit-volunteer.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  {
    path: 'manageVolunteer',
    component: ManageVolunteerComponent
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      // Lazy load ManageOpportunitiesModule
      {
        path: 'manageOpportunities',
        loadChildren: () => import('./manage-opportunities/manage-opportunities.module').then(m => m.ManageOpportunitiesModule)
      }
    ]
  },
  {
  path: 'createVolunteer',
  component: CreateVolunteerComponent
  },
  {
    path: 'manageVolunteer',
    component: ManageVolunteerComponent
  },
  {
    path: 'editVolunteer/:id',
    component: EditVolunteerComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
