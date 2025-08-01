import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ShortLink } from '../../interfaces/short-link.model';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { App } from '../../../app';
import { ButtonCopy } from "../button-copy/button-copy";

@Component({
  selector: 'app-item-link',
  imports: [CommonModule, DateFormatPipe, ButtonCopy],
  templateUrl: './item-link.html',
  styleUrl: './item-link.scss'
})
export class ItemLink {
  @Input() public item: ShortLink;

  constructor(
    public app: App,
  ) {
  }

}
