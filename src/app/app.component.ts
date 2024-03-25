import { HttpClient } from '@angular/common/http';
import { Component, Input, SimpleChanges } from '@angular/core';
import { Data, View,  } from './view';
import { ViewPointServiceService } from './view-point-service.service';
import { Category } from './Category';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @Input("SearchKeyWord") SearchKeyWord: string = "";

  title = 'ViewPoint';
  currentnumber:number = 1;
  viewPointService: any;
  category: Category = new Category();
  allData :Data = new Data();
  selectedCategoryIds: string[] = [];


  constructor(private service:ViewPointServiceService){
    this.service.getViewDatas(1).subscribe(x=>{
      this.allData.data = x.data;
      this.allData.total = x.total
      this.category.fillCategories(this.allData.data);
    })


  }

  ngOnInit(): void {
    this.category.NotifyCategory.asObservable().subscribe(x=>{
        this.SearchViewDataByCategory(x);
    })
  }

  SearchViewDataByCategory(category:string){
    this.service.getViewDataByCategory(1,category).subscribe(x=>{
      this.allData.total = x.total;
      this.allData.data = x.data;
    })
  }



onCheckboxChange(event: any, id: string) {
  this.category.SendCategory(id,event.target.checked);
}


  changePage(number:any)
  {
    this.currentnumber = number;
    console.log(this.currentnumber)

    this.service.getViewDatas(this.currentnumber).subscribe(x=>{
      console.log(x.data)
      this.allData.data = x.data;
      this.allData.total = x.total
    })

  }



  handleSearch(receivedValue: string) {

    this.service.getViewDatas(this.currentnumber).subscribe(x=>{
      this.allData.filteredData = this.allData.data.filter(item =>
        item.name.includes(receivedValue)
        // this.catagoryID.push
      );
      if(receivedValue){
      this.allData.data = this.allData.filteredData;
      this.allData.total = x.total
      }
      else{
      this.allData.data = x.data;
      this.allData.total = x.total
      }
    })
  }
}
