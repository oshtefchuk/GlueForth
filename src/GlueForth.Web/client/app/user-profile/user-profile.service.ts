import { Injectable } from '@angular/core';
import {User} from "../shared/models/user.model";
import {Commodity} from "../shared/models/commodity.model";
import {Supplier} from "../shared/models/supplier.model";
import {ActivatedRoute} from "@angular/router";
import {Observable, of} from "rxjs/index";
import {mergeMap} from "rxjs/internal/operators";


const userInfo: User = {
  'UserName': '',
  'FirstName': '',
  'LastName': '',
  'Email': '',
  'Country': '',
  'TelephoneNumber': '',
  'MobileNumber': '',
  'OldPassword': '',
  'NewPassword': ''
};

const newCommodity: Commodity = {
  'Title': '',
  'Reference': ''
};

const newSupplier: Supplier = {
  'Title': '',
  'ShortTitle': '',
  'Description': ''
};

export class MenuItem {
  id: string;
  text: string;
  route?: string;
  expanded?: boolean;
  items?: MenuItem[];
  icon?: string;
}

let profileMenuSidebar: MenuItem[] = [
  {id: "1",
      text: "My Profile",
    route: "info",
    icon: "chevronright"

  },
  {id: "2",
    text: "My Organisation",
    route: "organisation",
    icon: "chevronright"
  },
  {id: "3",
    text: "My Business Unit",
    route: "business-unit",
    icon: "chevronright"

  },
  {id: "4",
    text: "Manage Subscription",
    route: "subscription",
    icon: "chevronright"
  }
];

@Injectable()
export class UserProfileService {

  constructor(private route: ActivatedRoute) {
  }

  getUser(): User {
    return userInfo;
  }

  getMenuItems(): MenuItem[] {
    return profileMenuSidebar;
  }

  getNewCommodity(): Commodity {
    return newCommodity;
  }

  getNewSupplier(): Supplier {
    return newSupplier;
  }

  public getCurrentUnitId(): Observable<string> {
    return this.route.params.pipe(
      mergeMap(params => {
      let currentUnitId = params['unitId'];
      return of(currentUnitId);
    })
    )
  }
}
