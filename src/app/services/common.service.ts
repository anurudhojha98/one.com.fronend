import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonFunction {

  public showLogger = true;
  public data: any;
  constructor() { }
  public setIsShowLogger(value: any): any {
    this.showLogger = value;
  }

  public getIsShowLogger(): any {
    return this.showLogger;
  }
  public isUndefinedOrNullEmpty(val: any): any {
    let status: any = false;
    if (this.isEmptyString(val)) {
      status = true;
    } else if (this.isEmptyArray(val)) {
      status = true;
    } else if (val === null) {
      status = true;
    } else {
      if (val === undefined || val === 'undefined') {
        status = true;
      } else {
        status = false;
      }
    }
    return status;
  }
  public isEmptyArray(data: any[]): any {
    if (data instanceof Array && data.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  public isEmptyString(val: any): any {
    if (typeof val === 'string') {
      if (val.trim() === '') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  public getDataFromLocalStorage(name: any): any {
    let val: any = localStorage.getItem(name);
    if (!this.isUndefinedOrNullEmpty(val)) {
      if (this.isJsonString(val)) {
        val = JSON.parse(val);
      }
    } else {
      val = '';
    }
    return val;
  }

  public isJsonString(val: any) {
    try {
      JSON.parse(val);
    } catch (e) {
      return false;
    }
    return true;
  }

  public clearLocalstorageForLogout() {
    this.removeDataFromLocalStorage('User');
    this.removeDataFromLocalStorage('token');
  }

  public removeDataFromLocalStorage(name: any) {
    localStorage.removeItem(name);
  }

  public setIsToShowToaster(value: any): any {
    this.showLogger = value;
  }

  public addDataToLocalStorage(key: any, value: any) {
    localStorage.setItem(key, value);
  }

  public setData(data: any) {
    this.data = data;
  }

  public getData() {
    return this.data;
  }

  public getPermissionsForRole(role: string) {
    let permissions: any = {
      'admin': ["create", "update", "delete", "fetch"],
      'seller': ["create", "update", "fetch"],
      'supporter': ["delete", "fetch"],
      'customer': ["fetch"],
    }
    return permissions[role];
  }

}
