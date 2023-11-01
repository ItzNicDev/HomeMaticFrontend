import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() {
  }

  set(value: any, key: string) {
    localStorage.setItem(key, value);
  }

  get(key: string): any {
    return localStorage.getItem(key);


  }

}
