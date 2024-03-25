import { Pagination } from './Pagination';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Subject, debounce, debounceTime } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input("total") total:number = 0;
  @Output("pageChange")  pageChange = new EventEmitter<number>();
  private ChangePage = new Subject<number>();
  pagination:Pagination = new Pagination();




  ngOnInit(){
    this.emitpage();
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['total']) {


      let total =   changes['total'].currentValue;
      this.pagination.Total = total;
    }


  }


  PrevClick(){
    let page = this.pagination.GetPrevNumber();
    this.ChangePage.next(page);

  }

  NextClick(){
    let page = this.pagination.GetNextNumber();
    this.ChangePage.next(page);

  }



  goToPage(page: number) {

    this.pagination.currentPage = page;
    this.ChangePage.next(page);
  }

  emitpage(){
    this.ChangePage.pipe(
      debounceTime(300)
    ).subscribe(
      page =>{
        this.pageChange.emit(page)
      }
    )
  }
}
