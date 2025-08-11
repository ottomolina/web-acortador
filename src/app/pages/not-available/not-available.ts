import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-not-available',
  imports: [CommonModule, LottieComponent, TranslatePipe],
  templateUrl: './not-available.html',
  styleUrl: './not-available.scss'
})
export default class NotAvailable {
  options: AnimationOptions = {
    path: './no-data.json'
  };

  constructor(
    private title: Title,
    private translate: TranslateService,
    private cdf: ChangeDetectorRef,
  ){
    setTimeout(() => {
      this.title.setTitle(this.translate.instant('not-available.title-page'));
      this.cdf.detectChanges();
    }, 100);
  }

}
