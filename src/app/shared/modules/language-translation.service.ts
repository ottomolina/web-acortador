import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

const langs = [ 'en', 'es' ];

@Injectable({ providedIn: 'root' })
export class LanguageTranslationService {
    constructor(
        private translate: TranslateService
    ) {
        this.translate.addLangs(langs);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang()!;
        this.translate.use(langs.findIndex(item => item == browserLang) != -1 ? browserLang : 'en');
    }
}