import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-button-activate',
  imports: [TranslatePipe, FormsModule],
  templateUrl: './button-activate.html',
  styleUrl: './button-activate.scss'
})
export class ButtonActivate {
  @Input() public state: boolean;
  @Output() public onChange = new EventEmitter<boolean>();

  public change(event: any) {
    this.onChange.emit(event.target.checked);
  }
}
