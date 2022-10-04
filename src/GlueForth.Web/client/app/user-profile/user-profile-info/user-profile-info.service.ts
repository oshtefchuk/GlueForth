import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UserProfileInfoService {

  constructor(private httpClient: HttpClient) { }

}
