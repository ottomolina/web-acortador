import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageTranslationService } from './shared/modules/language-translation.service';
import { Toast } from "./core/components/toast/toast";
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  @ViewChild('toast') public toast: Toast;

  public sizePagination: number = 5;

  constructor(
      private translate: LanguageTranslationService,
      private translateService: TranslateService,
      private title: Title,
  ) {
    setTimeout(() => {
      this.title.setTitle(this.translateService.instant('app.title'));
    }, 500);
  }

  public getUrlShort(linkShort: string) {
    if(environment.prod) {
      return `${location.origin}/web-acortador/redirect/${linkShort}`
    }
    return `${location.origin}/redirect/${linkShort}`
  }

  public getDate() {
    const date = new Date();
    const offset = date.getTimezoneOffset();
    return new Date(date.getTime() - (offset*60*1000)).toISOString().split('T')[0];
  }

  public getDatetime() {
    const date = new Date();
    const offset = date.getTimezoneOffset();
    return new Date(date.getTime() - (offset*60*1000)).toISOString();
  }
}
