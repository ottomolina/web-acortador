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
  constructor(
      private translate: LanguageTranslationService
  ) {
  }
}
