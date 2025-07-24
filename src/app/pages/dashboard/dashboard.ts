import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "../../core/components/navbar/navbar";


@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, Navbar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export default class Dashboard {
  constructor() { }
}
