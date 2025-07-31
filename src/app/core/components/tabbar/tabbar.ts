import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

declare var bootstrap: any;
@Component({
  selector: 'app-tabbar',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './tabbar.html',
  styleUrl: './tabbar.scss'
})
export class Tabbar {
  @Input() public title: string;
  @Input() public search: boolean = true;
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
