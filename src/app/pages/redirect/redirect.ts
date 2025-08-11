import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, DOCUMENT, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { LinksService } from '../../core/services/links/links.service';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { Title } from '@angular/platform-browser';
import { CounterService } from '../../core/services/counter/counter.service';
import { App } from '../../app';

interface IParams {
  id: string;
}

@Component({
  selector: 'app-redirect',
  imports: [
    CommonModule, LottieComponent, TranslatePipe
  ],
  templateUrl: './redirect.html',
  styleUrl: './redirect.scss'
})
export default class Redirect implements OnInit {
  options: AnimationOptions = {
    path: './invalid-link.json'
  };

  public url: string;
  public showError: boolean;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
    private linkService: LinksService,
    private cdf: ChangeDetectorRef,
    private router: Router,
    private title: Title,
    private translate: TranslateService,
    private counterService: CounterService,
    private app: App,
  ) {
  }
  
  async ngOnInit(): Promise<void> {
    try {
      const params: IParams = await firstValueFrom(this.route.params) as IParams;
      if(!params.id) {
        this.fnShowError();
        return;
      }
      const shortLink = await firstValueFrom(this.linkService.getUrlByLinkCorto(params.id));
      if(shortLink.length === 0) {
        this.fnShowError();
        return;
      }
      if(!shortLink[0].state) {
        this.router.navigateByUrl('/not-available');
        return;
      }
      this.changeTitle('redirect.title-page');
      const datetime = this.app.getDate();
      const listCounter = await firstValueFrom(this.counterService.getCounterByLinkId(shortLink[0].id!));
      const counter = listCounter[0];
      counter.datetime.push(datetime);
      await this.counterService.incrementCounter(counter);
      this.url = shortLink[0].urlOriginal;
      this.goToPage();
    } catch(error) {
      console.error('error', error);
      this.fnShowError();
    }
  }

  private fnShowError() {
    this.showError = true;
    this.cdf.detectChanges();
    this.changeTitle('redirect.error.title-page');
  }

  public goToPage() {
    this.document.location.href = this.url;
  }

  private changeTitle(title: string) {
    setTimeout(() => {
      this.title.setTitle(this.translate.instant(title));
      this.cdf.detectChanges();
    }, 100);
  }

}
