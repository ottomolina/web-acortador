import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
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

  private router: Router = inject(Router);

  clickBtnSearch() {
    const collapse = document.getElementById('divInput');
    const col = new bootstrap.Collapse(collapse);
    col.show();
  }

  inputSearch(event: any) {
    this.onSearch.emit(event.srcElement.value);
  }

  clickBtnAdd() {
    this.router.navigateByUrl('/dashboard/form-link');
  }
}
