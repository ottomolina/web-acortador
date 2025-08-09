import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { App } from '../../app';
import { Auth } from '@angular/fire/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { GoogleUser } from '../../core/interfaces/google-user.model';

@Component({
  selector: 'app-login',
  imports: [TranslatePipe],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export default class Login {
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private app: App,
    private translate: TranslateService,
    private auth: Auth,
  ) {
  }

  public async clickBtnLogin() {
    try {
      signInWithPopup(this.auth, new GoogleAuthProvider()).then(
        data => {
          const user: GoogleUser = {
            id: data.user.uid,
            email: data.user.email!,
            displayName: data.user.displayName!,
            photoURL: data.user.photoURL!,
          }
          if(user) {
            this.authService.setLogged(user);
            this.router.navigateByUrl('/dashboard');
          }
        }
      );
    } catch(error) {
      console.error('error', error);
      this.app.toast.error(this.translate.instant('login.error-login'));
    }
  }

  public ngOnInit(): void { }

}

