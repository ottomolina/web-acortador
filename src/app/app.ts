import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageTranslationModule } from './shared/modules/language-translation.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LanguageTranslationModule, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'web-acortador';
}
