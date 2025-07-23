import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ShortLink } from '../../interfaces/short-link.model';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { App } from '../../../app';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-item-link',
  imports: [CommonModule, DateFormatPipe, TranslatePipe],
  templateUrl: './item-link.html',
  styleUrl: './item-link.scss'
})
export class ItemLink {
  @Input() public item: ShortLink;

  constructor(
    private app: App,
    private translate: TranslateService
  ) {
  }

  public getUrlShort() {
    return `${location.origin}/${this.item.urlShorten}`
  }

  public btnCopy() {
    navigator.clipboard.writeText(this.getUrlShort()).then();
    this.app.toast.success(this.translate.instant('item-link.copied'))
  }
}
