import { Injectable, Inject } from '@angular/core';

@Injectable()
export class LocalStorageService {
  constructor() {}

  public get(key: string): any {
   return JSON.parse(localStorage.getItem(key));
  }

  public set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public remove(key: string) {
    localStorage.removeItem(key);
  }
}
