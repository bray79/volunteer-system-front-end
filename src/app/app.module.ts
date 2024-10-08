import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageVolunteerComponent } from './manage-volunteer/manage-volunteer.component';
import { ManageOpportunitiesModule } from './manage-opportunities/manage-opportunities.module';
import { DashComponent } from './dash/dash.component';
import { CreateVolunteerComponent } from './create-volunteer/create-volunteer.component';
import { EditVolunteerComponent } from './edit-volunteer/edit-volunteer.component';
import { OpportunityListComponent } from './manage-volunteer/opportunities-list/opportunities-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    DashboardComponent,
    ManageVolunteerComponent,
    DashComponent,
    CreateVolunteerComponent,
    EditVolunteerComponent,
    OpportunityListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ManageOpportunitiesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

