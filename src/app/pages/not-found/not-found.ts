import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-not-found',
  imports: [LottieComponent, TranslatePipe],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss'
})
export default class NotFound {
  options: AnimationOptions = {
    path: './not-found.json'
  };

  constructor(
    private route: Router
  ) {
  }

  public goHome() {
    this.route.navigateByUrl('/');
  }
}
