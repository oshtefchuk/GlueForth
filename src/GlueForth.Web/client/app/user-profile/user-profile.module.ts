import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './user-profile.routing.module';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileInfoComponent } from './user-profile-info/user-profile-info.component';
import { UserProfileOrganisationComponent } from './user-profile-organisation/user-profile-organisation.component';
import { UserProfileBusinessUnitComponent } from './user-profile-business-unit/user-profile-business-unit.component';
import { UserProfileBusinessUnitItemComponent } from './user-profile-business-unit-item/user-profile-business-unit-item.component';
import { SharedModule } from '../shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ],
  declarations: [
  UserProfileComponent,
  UserProfileInfoComponent,
  UserProfileOrganisationComponent,
  UserProfileBusinessUnitComponent,
  UserProfileBusinessUnitItemComponent,
],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserProfileModule{}


