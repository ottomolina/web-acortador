import { NgModule } from "@angular/core";
import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";

import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

const langs = [ 'en', 'es' ];

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './i18n/', '.json');
}

@NgModule({
    declarations: [],
    imports: [
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
        })
    ],
    exports: [
        TranslateModule
    ]
})
export class LanguageTranslationModule {
    constructor(
        private translate: TranslateService
    ) {
        this.translate.addLangs(langs);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang()!;
        this.translate.use(langs.findIndex(item => item == browserLang) != -1 ? browserLang : 'en');
    }
}