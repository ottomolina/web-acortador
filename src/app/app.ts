import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageTranslationService } from './shared/modules/language-translation.service';
import { Toast } from "./core/components/toast/toast";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  @ViewChild('toast') public toast: Toast;
  protected title = 'web-acortador';
  public sizePagination: number = 5;

  constructor(
      private translate: LanguageTranslationService
  ) {
  }

  public getUrlShort(linkShort: string) {
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
