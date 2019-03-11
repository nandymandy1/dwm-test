import { Injectable } from "@angular/core";

@Injectable()
export class DataProvider {
  userSessionToken: any;
  userData: any;
  constructor() {}
  getUserSessionToken(): any {
    return this.userSessionToken;
  }
  setUserSessionToken(data): any {
    this.userSessionToken = data;
    console.log("val 2..", this.userSessionToken);
  }
}
