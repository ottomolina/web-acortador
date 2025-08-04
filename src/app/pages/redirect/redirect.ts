import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, DOCUMENT, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { LinksService } from '../../core/services/links/links.service';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { Title } from '@angular/platform-browser';

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
  ) { }
  
  async ngOnInit(): Promise<void> {
    try {
      const params: IParams = await firstValueFrom(this.route.params) as IParams;
      if(!params.id) {
        this.fnShowError();
        return;
      }
      const data = await firstValueFrom(this.linkService.getUrlByLinkCorto(params.id));
      if(data.length === 0) {
        this.fnShowError();
        return;
      }
      if(!data[0].state) {
        this.router.navigateByUrl('/not-available');
        return;
      }
      this.url = data[0].urlOriginal;
      this.goToPage();
    } catch(error) {
      this.fnShowError();
    }
  }

  private fnShowError() {
    this.showError = true;
    this.cdf.detectChanges();
    this.changeTitle();
  }

  public goToPage() {
    this.document.location.href = this.url;
  }

  private changeTitle() {
    setTimeout(() => {
      this.title.setTitle(this.translate.instant('redirect.title-page'));
      this.cdf.detectChanges();
    }, 100);
  }

}
