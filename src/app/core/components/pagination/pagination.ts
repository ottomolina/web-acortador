import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { App } from '../../../app';

interface Numbers {
  number: number;
  active: boolean;
}

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss'
})
export class Pagination implements OnChanges {
  @Input() lengthList: number;
  @Output() onChangePage = new EventEmitter<number>();

  public listNumbers: Array<Numbers>;
  public numberActive: number = 1;
  public initial: number = 0;
  public final: number = 5;

  constructor(
    public app: App,
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if(changes['lengthList']) {
      this.loadPagination();
    }
  }

  public loadPagination() {
    this.listNumbers = [];
    const sizeOfNumbers = Math.ceil(this.lengthList/this.app.sizePagination);
    let i = 1;
    while(i <= sizeOfNumbers) {
      this.listNumbers.push({number: i, active: i==1});
      i++;
    }
  }

  public clickPage(number: number) {
    this.numberActive = number;
    this.listNumbers.forEach(e => e.active = false);
    this.listNumbers.find(e => e.number === number)!.active = true;
    this.onChangePage.emit(number);
  }

  public clickPrev() {
    const digit = +this.numberActive.toString().split('').reverse()[0];
    if(digit === 1 || digit === 6) {
      this.final = this.final-this.app.sizePagination;
      this.initial = this.final-this.app.sizePagination;
    }
    this.clickPage(this.numberActive-1);
  }

  public clickNext() {
    if(this.numberActive % this.app.sizePagination === 0) {
      this.initial = this.initial+this.app.sizePagination;
      this.final = this.initial+this.app.sizePagination;
    }
    this.clickPage(this.numberActive+1);
  }

  public clickPrevFirst() {
    this.initial = 0;
    this.final = this.app.sizePagination;
    this.clickPage(1);
  }

  public clickNextLast() {
    const pages = Math.floor(this.listNumbers.length / this.app.sizePagination);
    this.initial = pages*this.app.sizePagination;
    this.final = this.initial+this.app.sizePagination;
    this.clickPage(this.listNumbers.length);
  }
}
