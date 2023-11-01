import {Injectable} from '@angular/core';
import {Network} from '@capacitor/network';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor() {
  }

  async isConnected() {
    return (await Network.getStatus()).connected;
  }

}
