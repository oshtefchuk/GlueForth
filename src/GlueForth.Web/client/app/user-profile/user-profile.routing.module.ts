import { NgModule } from '@angular/core';

import { UserProfileBusinessUnitItemComponent } from './user-profile-business-unit-item/user-profile-business-unit-item.component';
import { UserProfileBusinessUnitComponent } from './user-profile-business-unit/user-profile-business-unit.component';
import { UserProfileOrganisationComponent } from './user-profile-organisation/user-profile-organisation.component';
import { UserProfileInfoComponent } from './user-profile-info/user-profile-info.component';
import { UserProfileComponent } from './user-profile.component';
import { RouterModule } from '@angular/router';


export const profileRoutes = [
  {
    path: '',
    component: UserProfileComponent,
    children: [
      {
        path: '',
        component: UserProfileInfoComponent,
        data: { title: 'MY PROFILE' }
      },
      {
        path: 'info',
        component: UserProfileInfoComponent,
        data: { title: 'MY PROFILE' }
      },
      {
        path: 'organisation',
        component: UserProfileOrganisationComponent,
        data: { title: 'MY ORGANISATION' }
      },
      {
        path: 'business-unit',
        component: UserProfileBusinessUnitComponent,
        data: { title: 'MY BUSINESS UNITS' }
      },
      {
        path: 'business-unit/:unitId',
        component: UserProfileBusinessUnitItemComponent,
        data: { title: 'MY BUSINESS UNIT SETUP' }
      },
      {
        path: 'business-unit/new-unit',
        component: UserProfileBusinessUnitItemComponent,
        data: { title: 'MY BUSINESS UNIT SETUP' }
      }
    ]},
];


@NgModule({
  imports: [RouterModule.forChild(profileRoutes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule{};


