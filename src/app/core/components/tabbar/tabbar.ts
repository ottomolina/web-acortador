import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tabbar',
  imports: [],
  templateUrl: './tabbar.html',
  styleUrl: './tabbar.scss'
})
export class Tabbar {
  @Input() public title: string;
}
