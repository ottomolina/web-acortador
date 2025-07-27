import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

declare var bootstrap: any;
@Component({
  selector: 'app-tabbar',
  imports: [TranslatePipe],
  templateUrl: './tabbar.html',
  styleUrl: './tabbar.scss'
})
export class Tabbar {
  @Input() public title: string;
  @Output() public onSearch = new EventEmitter<string>();

  clickBtnSearch() {
    const collapse = document.getElementById('divInput');
    const col = new bootstrap.Collapse(collapse);
    col.show();
  }

  inputSearch(event: any) {
    this.onSearch.emit(event.srcElement.value);
  }
}
