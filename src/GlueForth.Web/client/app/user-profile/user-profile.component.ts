import {Component, OnChanges, OnInit} from '@angular/core';
import { UserProfileService } from "./user-profile.service";
import { User } from "../shared/models/user.model";
import {HomeService, MenuItem} from "../home/home.service";
import {ActivatedRoute, NavigationEnd, Route, Router, RoutesRecognized} from "@angular/router";
import { AuthService } from "../shared/services/auth.service";
import { UserService } from "../shared/services/user.service";
import {Title} from "@angular/platform-browser";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';


@Component({
  selector: 'bluenorth-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnChanges {

  public userInfo: User;
  public countries: string[];
  public menuSidebar: MenuItem[];
  public currentItem: MenuItem;
  public currentUser: any;
  public title: string;
  public showBusinessUnitExplanationSpan: boolean = false;
  public showOrganisationExplanationSpan: boolean = false;
  public showProfileInfoExplanationSpan: boolean = false;

  public isActive = '';
  screen(width) {
    return ( width < 1000 ) ? 'sm' : 'lg';
  }
  constructor(
    private userProfileService: UserProfileService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private titleService: Title
    ) {
    this.menuSidebar = this.userProfileService.getMenuItems();
    this.currentItem = this.menuSidebar[0];

  }

  ngOnInit() {
    this.currentUser = this.route.snapshot.data['currentUser'];

    if(!this.currentUser.AcceptedTermsConditions) {
      this.router.navigateByUrl('/profile/info')
      this.isActive = 'info'
      this.title = this.titleService.getTitle();
      return
    }

    this.userService.setCurrentUser(this.currentUser);

    this.title = this.titleService.getTitle();
    if(this.route.snapshot['_routerState'].url.length === 8) {
      this.isActive = 'info';
    } else {
    this.isActive = this.route.snapshot['_routerState'].url.substring(9);
    }


    this.router.events.subscribe(event=> {
      if(event instanceof NavigationEnd){
        if(event.url.includes('/profile/business-unit/'))
       // '/profile/business-unit/')
          this.showBusinessUnitExplanationSpan = false;
        this.title = this.titleService.getTitle();
         // this.title = 'MY BUSINESS UNIT'
      }

    })

    /*this.route.firstChild.params.subscribe(params => {
      if(params.hasOwnProperty('unitId')){
        this.showBusinessUnitExplanationSpan = false;
        this.title = 'MY BUSINESS UNIT'
      }

    });*/



    if (this.router.url === '/profile/business-unit') {
      this.showBusinessUnitExplanationSpan = true;
    }
    if (this.router.url === '/profile/organisation') {
      this.showOrganisationExplanationSpan = true;
    }
    if (this.router.url === '/profile/info' || this.router.url === '/profile') {
      this.showProfileInfoExplanationSpan = true;
    }
  }

  selectItem(e) {
    this.currentItem = e.itemData;
    this.title = this.titleService.getTitle();
  }
  getTitle(route, title){
    if(!this.currentUser.AcceptedTermsConditions) {
      this.router.navigateByUrl('/profile/info')
      this.isActive = 'info'
      return
    }
    this.router.navigate([`/profile/${route}`]);
    this.titleService.setTitle(title);
    this.title = this.titleService.getTitle();
    this.isActive = route;
    if (route === 'business-unit') {
      this.showBusinessUnitExplanationSpan = true;
    } else {
      this.showBusinessUnitExplanationSpan = false;
    }

    if (route === 'organisation') {
      this.showOrganisationExplanationSpan = true;
    } else {
      this.showOrganisationExplanationSpan = false;
    }

    if (route === 'info') {
      this.showProfileInfoExplanationSpan = true;
    } else {
      this.showProfileInfoExplanationSpan = false;
    }
  }
    ngOnChanges() {

}

  public logout() {
    this.authService.logout();
  }
}
