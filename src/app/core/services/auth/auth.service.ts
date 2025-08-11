import { Injectable } from '@angular/core';
import { GoogleUser } from '../../interfaces/google-user.model';
import { SecurityService } from '../../../shared/security/security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private KEY_TOKEN = 'AL00001';

  constructor(
    private secure: SecurityService
  ) { }

  public setLogged(user: GoogleUser) {
    const data = this.secure.encrypt(user);
    localStorage.setItem(this.KEY_TOKEN, JSON.stringify(data));
  }

  public logout() {
    localStorage.removeItem(this.KEY_TOKEN);
  }

  public isAuthenticated() {
    const data = localStorage.getItem(this.KEY_TOKEN);
    if (data === null || data === undefined || data === '') {
      return false;
    }
    try {
      this.secure.decrypt<GoogleUser>(JSON.parse(data));
    } catch(error) {
      console.error('error', error);
      return false;
    }
    return true;
  }

  get user () {
    const data = localStorage.getItem(this.KEY_TOKEN);
    if (data === null || data === undefined || data === '') {
      return null;
    }
    try {
      const userData = this.secure.decrypt<GoogleUser>(JSON.parse(data));
      return userData;
    } catch(error) {
      console.error('error', error);
      return null;
    }
  }

}
