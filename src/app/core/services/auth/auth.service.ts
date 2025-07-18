import { Injectable } from '@angular/core';
import { SocialUser } from '@abacritt/angularx-social-login';
import { SecurityService } from '../../../shared/security/security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private KEY_TOKEN = 'AL00001';

  constructor(
    private secure: SecurityService
  ) { }

  public setLogged(user: SocialUser) {
    const data = this.secure.encrypt(user);
    sessionStorage.setItem(this.KEY_TOKEN, JSON.stringify(data));
  }

  public isAuthenticated() {
    const data = sessionStorage.getItem(this.KEY_TOKEN);
    if (data === null || data === undefined || data === '') {
      return false;
    }
    try {
      this.secure.decrypt<SocialUser>(JSON.parse(data));
    } catch(error) {
      console.error('error', error);
      return false;
    }
    return true;
  }

  get user () {
    const data = sessionStorage.getItem(this.KEY_TOKEN);
    if (data === null || data === undefined || data === '') {
      return null;
    }
    try {
      const userData = this.secure.decrypt<SocialUser>(JSON.parse(data));
      return userData;
    } catch(error) {
      console.error('error', error);
      return null;
    }
  }

}
