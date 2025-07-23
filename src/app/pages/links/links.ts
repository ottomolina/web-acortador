import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Tabbar } from "../../core/components/tabbar/tabbar";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-links',
  imports: [CommonModule, Tabbar, TranslatePipe],
  templateUrl: './links.html',
  styleUrl: './links.scss'
})
export default class Links {
}
