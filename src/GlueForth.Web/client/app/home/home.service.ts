import { Injectable } from '@angular/core';

import { UnitInfo } from '../shared/models/unit.model';

import { BehaviorSubject, Observable, Subject } from 'rxjs/index';


export class MenuItem {
  id: string;
  text: string;
  subtitle?: string;
  route?: string;
  expanded?: boolean;
  items?: MenuItem[];
  icon?: string;
  parentRoute?: boolean;
  isSelected?: boolean;
  isActive?: boolean = true;
}

const adminMenuSidebar: MenuItem[] = [
  {
    id: '1',
    text: 'DASHBOARD',
    route: 'dashboard',
    icon: 'network_check',
    parentRoute: true,
    isSelected: false
  },
  {
    id: '2',
    text: 'STRATEGIC ASSESSMENT',
    route: 'assessment-current-status',
    icon: 'pie_chart',
    parentRoute: true,
    isSelected: false,
    items: [
      {
        id: '2_1',
        text: 'Full Assessment',
        route: 'assessment-capture-full',
        parentRoute: false
      },
      {
        id: '2_2',
        text: 'Reporting',
        route: 'assessment-reporting',
        parentRoute: false
      },
      {
        id: '2_3',
        text: 'Notes & Files',
        route: 'assessment-repository',
        parentRoute: false
      }
     ]
  },
  {
    id: '3',
    text: 'PERFORMANCE INDICATORS',
    route: 'performance-indicators-current-status',
    icon: 'search',
    parentRoute: true,
    isSelected: false,
    items: [
      {
        id: '3_1',
        text: 'Capture',
        route: 'performance-indicators-capture',
        parentRoute: false
      },
      {
        id: '3_2',
        text: 'Area Mapping',
        route: 'performance-indicators-mapping',
        parentRoute: false
      },
      {
        id: '3_3',
        text: 'Reporting',
        route: 'performance-indicators-reporting',
        parentRoute: false
      },
    ]
  },
  {
    id: '4',
    text: 'MY ACTIONS',
    route: 'my-actions-current-status',
    icon: 'storage',
    parentRoute: true,
    isSelected: false,
    items: [
      {
        id: '4_1',
        text: 'Prioritise',
        route: 'my-actions-prioritise',
        parentRoute: false
      },
      {
        id: '4_2',
        text: 'Capture Actions',
        route: 'my-actions-capture',
        parentRoute: false
      },
      {
        id: '4_3',
        text: 'Tasks',
        route: 'my-actions-tasks',
        parentRoute: false
      },
      {
        id: '4_4',
        text: 'Reporting',
        route: 'my-actions-reporting',
        parentRoute: false
      }]
  },
  {
    id: '5',
    text: 'STANDARDS',
    subtitle: 'Current Status',
    route: 'standards-management-current-status',
    icon: 'account_balance',
    parentRoute: true,
    isSelected: false,
    items: [
      {
        id: '5_1',
        text: 'Control Points',
        route: 'standards-management-control-points',
        parentRoute: false
      }
      ]
  }/*,
  {
    id: '6',
    text: 'SYSTEM HEALTH',
    route: '//',
    icon: 'heart-pulse',
    parentRoute: true,
    isSelected: false
  }*/,
];

const liteMenuSidebar: MenuItem[] = [
  {
    id: '1',
    text: 'DASHBOARD',
    route: 'dashboard',
    icon: 'network_check',
    parentRoute: true,
    isSelected: false
  },
  {
    id: '2',
    text: 'STRATEGIC ASSESSMENT',
    route: 'assessment-current-status',
    icon: 'pie_chart',
    parentRoute: true,
    isSelected: false,
    items: [
      {
        id: '2_1',
        text: 'Lite Assessment',
        route: 'assessment-capture-light',
        parentRoute: false
      },
      {
        id: '2_2',
        text: 'Reporting',
        route: 'assessment-reporting',
        parentRoute: false
      },
      {
        id: '2_3',
        text: 'Notes & Files',
        route: 'assessment-repository',
        parentRoute: false
      }
    ]
  },
  {
    id: '3',
    text: 'PERFORMANCE INDICATORS',
    route: 'performance-indicators-current-status',
    icon: 'search',
    parentRoute: true,
    isSelected: false,
    items: [
      {
        id: '3_1',
        text: 'Capture',
        route: 'performance-indicators-capture',
        parentRoute: false
      },
      {
        id: '3_2',
        text: 'Area Mapping',
        route: 'performance-indicators-mapping',
        parentRoute: false
      },
      {
        id: '3_3',
        text: 'Reporting',
        route: 'performance-indicators-reporting',
        parentRoute: false
      }]
  },
  {
    id: '4',
    text: 'MY ACTIONS',
    route: 'my-actions-current-status',
    icon: 'storage',
    parentRoute: true,
    isSelected: false,
    items: [
      {
        id: '4_1',
        text: 'Prioritise',
        route: 'my-actions-prioritise',
        parentRoute: false
      },
      {
        id: '4_2',
        text: 'Capture Actions',
        route: 'my-actions-capture',
        parentRoute: false
      },
      {
        id: '4_3',
        text: 'Tasks',
        route: 'my-actions-tasks',
        parentRoute: false
      },
      {
        id: '4_4',
        text: 'Reporting',
        route: 'my-actions-reporting',
        parentRoute: false
      }]
  }
];

@Injectable()
export class HomeService {
  public unitSelector$: Subject<UnitInfo> = new Subject();
  public completeBy$: BehaviorSubject<number> = new BehaviorSubject(1);
  public fullScreenOpen$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public title: Subject<string> = new Subject();
  public isAssessmentTypeExists: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  getMenuItems(): MenuItem[] {
    return  adminMenuSidebar;
  }

  getNewUnitSidebar(): MenuItem[] {
    return liteMenuSidebar
  }

  getDataFromUnitSelector(): Observable<any> {
    return this.unitSelector$;
  }
  setDataFromUnitSelector(data) {
    this.unitSelector$.next(data.selectedItem);
  }
  preselectDataToFilter(value){
    this.completeBy$.next(value);
  }
  getValueForFilter() {
    return this.completeBy$;
  }
  changeFullscreenMode(mode: boolean) {
    this.fullScreenOpen$.next(mode)
  }
  getFullSceenMode() {
    return this.fullScreenOpen$;
  }
  getAssessmentype() {
    return this.isAssessmentTypeExists;
  }

  changeAssessmentState(type: boolean) {
    this.isAssessmentTypeExists.next(type);
  }
}
