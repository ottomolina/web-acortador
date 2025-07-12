import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageTranslationService } from './shared/modules/language-translation.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'web-acortador';
  constructor(
      private translate: LanguageTranslationService
  ) {
  }
}
