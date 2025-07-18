import { GoogleSigninButtonModule, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { App } from '../../app';

@Component({
  selector: 'app-login',
  imports: [
    GoogleSigninButtonModule,
    TranslatePipe,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export default class Login {
  
  constructor(
    private router: Router,
    private authSocial: SocialAuthService,
    private authService: AuthService,
    private app: App,
    private translate: TranslateService,
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.authSocial.authState.subscribe({
      next: user => {
        this.authService.setLogged(user);
        this.router.navigateByUrl('/dashboard');
      }, 
      error: error => {
        console.error('error', error);
        this.app.toast.error(this.translate.instant('login.error-login'));
      } 
    });
  }

}

