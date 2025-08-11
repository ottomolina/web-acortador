import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  constructor(
    private translate: TranslateService
  ) {}

  transform(value: string, formatMonth: 'short'|'long'='short'): string {
    const dateAux = new Date(new Date(`${value}T00:00:00`)
      .toLocaleString('en-US', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
    );
    const dateRet = dateAux.toLocaleString(
      this.translate.currentLang,
      { month: formatMonth, day:'numeric', year: 'numeric'});
    return dateRet;
  }

}
