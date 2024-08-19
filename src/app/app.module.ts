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
import { CreateVolunteerComponent } from './create-volunteer/create-volunteer.component';
import { EditVolunteerComponent } from './edit-volunteer/edit-volunteer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    DashboardComponent,
    ManageVolunteerComponent,
    CreateVolunteerComponent,
    EditVolunteerComponent,
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

