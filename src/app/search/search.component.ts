import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Output("SearchKeyWord")  SearchKeyWord = new EventEmitter<string>();
  inputValue:string = '';
  private searchUpdate = new Subject<string>();

  ngOnInit(): void {
      this.emitpage();

  }


  SearchFor() {
    this.searchUpdate.next(this.inputValue);
  }


  emitpage(){

    this.searchUpdate.pipe(
      debounceTime(300)
    ).subscribe(inputValue => {
      this.SearchKeyWord.emit(inputValue);
    });
  }

}
