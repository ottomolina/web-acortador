import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShortLink } from '../../interfaces/short-link.model';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { App } from '../../../app';
import { ButtonCopy } from "../button-copy/button-copy";
import { ButtonActivate } from "../button-activate/button-activate";

@Component({
  selector: 'app-item-link',
  imports: [CommonModule, DateFormatPipe, ButtonCopy, ButtonActivate],
  templateUrl: './item-link.html',
  styleUrl: './item-link.scss'
})
export class ItemLink {
  @Input() public item: ShortLink;
  @Output() public onChangeState = new EventEmitter<ShortLink>();

  constructor(
    public app: App,
  ) {
  }

  public switch(newState: boolean) {
    this.item.state = newState;
    this.onChangeState.emit(this.item);
  }

}
