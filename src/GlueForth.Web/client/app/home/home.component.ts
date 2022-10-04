import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Title} from "@angular/platform-browser";

import {DxTreeViewComponent} from "devextreme-angular";

import {AuthService} from "../shared/services/auth.service";
import {AssessmentCaptureFullService} from "./assessment/assessment-capture-full/assessment-capture-full.service";
import {AssessmentStateService} from "./assessment/assessment-state/assessment-state.service";
import {HomeService, MenuItem} from './home.service';
import {UnitInfo} from "../shared/models/unit.model";
import {UnitService} from "../shared/services/unit.service";
import {UserFull, UserLight} from "../shared/models/user.model";
import {UserService} from "../shared/services/user.service";
import {pluck, map, switchMap} from "rxjs/operators";
import {MenuService} from "../shared/services/menu.service";


@Component({
  selector: 'bluenorth-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('DxTreeViewComponent') treeView: DxTreeViewComponent;

  public menuSidebar: MenuItem[] = [];
  public title: string;
  public subTitle: string;
  public unitsList: UnitInfo[];
  public userInfo: any = {};
  public currentUnitName: string = '';
  public currentRoute: string = '';
  public currentUser: UserFull;
  public routerState = false;
  public currentItem: any;
  public completeBy = 1;
  public routerUrl: string = '';
  public isScrolled = false;
  public isFullScreenOpen = false;
  public showFullScreenTooltip = false;
  public currentUnit: any;
  public selected = "selected";
  public lastUpdate: any;
  public dataForFilter = [{
    oid: 1,
    title: 'Management Focus Area',
    type: 'PrincipleGroups',
    selector: 'PrincipleGroup'
  }, {
    oid: 2,
    title: 'Principle',
    type: 'Principles',
    selector: 'Principle'
  }];
  private organisationOid: string;
  private isUnitSelectorInitialized: boolean = false;

  constructor(private homeService: HomeService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private userService: UserService,
              private unitService: UnitService,
              private assesmentStateService: AssessmentStateService,
              private assessmentCaptureFullService: AssessmentCaptureFullService,
              private menuService: MenuService,
              private titleService: Title
  ) {

      router.events.forEach((event) => {
        if(event instanceof NavigationEnd) {
          setTimeout(_ => {
            this.routerUrl = this.router.url;
            this.treeView.instance.unselectAll();
            if (this.menuSidebar) {
              this.menuSidebar.forEach(item => {
                if (item.route === this.router.url.substring(1)) {
                  this.currentItem = item;
                  this.treeView.instance.selectItem(this.currentItem.id);
                  this.treeView.instance.expandItem(this.currentItem);
                  this.titleService.setTitle(this.currentItem.text);
                  this.currentItem.subtitle ? this.subTitle = this.currentItem.subtitle : '';
                }
                if (item.items) {
                  item.items.forEach(point => {
                    if (point.route === this.router.url.substring(1)) {
                      this.currentItem = item;
                      this.subTitle = point.text;
                      this.treeView.instance.expandItem(item);
                      this.treeView.instance.selectItem(point)
                    } else {
                      this.treeView.instance.unselectItem(point);
                    }
                  })
                }
                if(this.router.url === '/') {
                  this.currentItem = this.menuSidebar[0]

                }
              })
            }
          });
        }
     });
  }

  ngOnInit() {
    if (this.route.snapshot['_routerState'].url === '/user-profile') {
      this.routerState = true;
    }
    this.currentUser = this.route.snapshot.data['currentUser'];

    if(!this.currentUser.AcceptedTermsConditions) {
      this.router.navigateByUrl('/profile/info')
    }

    this.userService.getLastUpdate().subscribe(response => {
      if (response && response !== '0001-01-01T00:00:00') {
        this.lastUpdate = response;
      }
    });
    this.organisationOid = this.currentUser['OrganisationOid'];
    this.userService.setCurrentUser(this.currentUser);
    this.title = this.titleService.getTitle();

    this.homeService.getDataFromUnitSelector()
      .subscribe((unit) => {
        //this.loadData()
        return this.unitService.getUnitById(unit.Oid)
          .pipe(
          pluck('AssessmentType')
          ).subscribe(type => {
            this.checkAssessmentType(type);
          });
      });

    this.homeService.isAssessmentTypeExists
      .subscribe(state => {
        if (state) {
          /*this.menuSidebar = this.homeService.getMenuItems();*/
        }
      });


    this.homeService.getFullSceenMode().subscribe(fullscreenMode => {
      this.isFullScreenOpen = fullscreenMode;
    });
    this.loadData();
    if (this.assesmentStateService.getDimentionOid().type && this.assesmentStateService.getDimentionOid().oid) {
      this.completeBy = this.assesmentStateService.getDimentionOid().type;
    }

    this.homeService.getValueForFilter()
      .subscribe(value => {
        this.completeBy = value;
      })
  }


  loadData() {
    this.unitService.getUnitById(this.currentUser.CurrentUnitId).pipe(
      pluck('AssessmentType')
      ).subscribe(type => {
        this.checkAssessmentType(type);
          this.unitService.getUnitsLiteListByUser()
            .subscribe((units: UnitInfo[]) => {
              this.unitsList = units;
            }, error => {
              this.userService.showUserNotification(error.error.Message, 'error')
          });
      },
        error => {
          this.userService.showUserNotification(error.error.Message, 'error');
        });
  }

  public goToUserProfile() {
    this.router.navigate(['profile']);
    this.routerState = true;
  }

  checkAssessmentType(type) {
    this.menuService.getDisabledByCurrentFramework()
      .subscribe((items: any) => {
        let currentMenu;
        if (type === -1) {
          this.homeService.isAssessmentTypeExists.next(false);
          currentMenu = this.homeService.getNewUnitSidebar();
        } else {
          if (type === 0) {
            currentMenu = this.homeService.getMenuItems();
          }
          if (type === 1) {
            currentMenu = this.homeService.getNewUnitSidebar();
          }
          this.homeService.isAssessmentTypeExists.next(true);
        }
        if (items && items.length) {
          this.menuSidebar = this.getAvailableItems(items, currentMenu)
        } else {
          this.menuSidebar = currentMenu
        }
      });
  }

  getAvailableItems = (items, currentMenu) => {
    items.forEach( el => {
      currentMenu.forEach(elems => {
        if(el === elems.route) {
          currentMenu = currentMenu.filter(e => e.route !== el )
        }
        else if(elems.items && elems.items.find(it => it.route === el)) {
            elems.items = elems.items.filter(els=> els.route !==el)
          }
      });
    });
    return currentMenu
  }

  public expandItem(e) {
    this.menuSidebar.forEach(item => {
      item.isSelected = false;
      if (e.itemData !== item) {
        this.treeView.instance.collapseItem(item);
        this.selectItem(e);
      }

    });
  }

  public selectItem(e) {

    this.treeView.instance.unselectAll();
    this.menuSidebar.forEach(item => {
      item.isSelected = false;
    });
    this.currentItem = e.itemData;
    // this.treeView.instance.selectItem(this.currentItem);
    this.routerState = false;
    if (this.currentItem.parentRoute) {
      this.menuSidebar.forEach(item => {
        item.isSelected = false;
        if (e.itemData !== item) {
          this.treeView.instance.collapseItem(item);
        }
      });
      this.treeView.instance.selectItem(this.currentItem);
      this.titleService.setTitle(this.currentItem.text);
      this.subTitle = '';
      this.currentItem.subtitle ? this.subTitle = this.currentItem.subtitle : '';
    }
    if (!this.currentItem.parentRoute) {
      this.titleService.setTitle(this.menuSidebar[+this.currentItem.id.substring(0, 1) - 1].text);
      this.subTitle = this.currentItem.text;
    }

    if (this.currentItem.route) {
      this.router.navigate([`/${this.currentItem.route}`]);
      this.title = this.titleService.getTitle();
    }
  }

  public logout() {
    this.authService.logout();
  }

  setCurrentUnit(value) {
    let isUnitChanged = this.currentUser.CurrentUnitId !== value.selectedItem.Oid;
    if (isUnitChanged) {
      this.currentUser.CurrentUnitId = value.selectedItem.Oid;
      this.userService.changeCurrentUnit(this.currentUser)
        .subscribe(currentUnitId => {
          this.currentUser.CurrentUnitId = currentUnitId;
          this.currentUnitName = value.selectedItem.UnitName;

          if (!this.isUnitSelectorInitialized) {
            this.isUnitSelectorInitialized = true;
            return;
          }
          this.homeService.setDataFromUnitSelector(value);
        },
        error1 => {},
        () => {
          if (isUnitChanged) {
            window.location.reload();
          }
        });
      if (this.routerUrl === '/assessment-capture-light' || this.routerUrl === '/assessment-capture-full') {
        this.router.navigate(['assessment-current-status']);
      }
    }
  }

 setCurrentFilter(event) {
    this.assessmentCaptureFullService.setDataFromCompleteByFilter(event.selectedItem);
  }
}
