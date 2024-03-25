import { Subject } from "rxjs";
import { CategoryDate, Data, View, } from "./view";

export class Category{
  service: any;
  includes(name: any) {
    throw new Error('Method not implemented.');
  }

  filteredData: View[] = [];
  category: string[] = [];
  categoryData: CategoryDate[] = [];
  selectedCategoryIds: string[] = [];
  responseData :Data = new Data();

  NotifyCategory = new Subject<string>();

  fillCategories(allData:View[]) {
    let categorySet = new Set();
    for (let item of allData) {
      let itemCategories = item.category;
      if (Array.isArray(itemCategories)) {
        for (let cat of itemCategories) {
          if (cat && !categorySet.has(cat.name)) {
            categorySet.add(cat.name);
            let newCategory = new CategoryDate();
            newCategory.id = cat.id;
            newCategory.name = cat.name;
            this.categoryData.push(newCategory);
          }
        }
      }
    }
  }

  SendCategory(categoryId:string,checked:boolean){
    if(checked)
      this.selectedCategoryIds.push(categoryId);
    else
      this.selectedCategoryIds = this.selectedCategoryIds.filter(x=>x!=categoryId);

    let categories =  this.selectedCategoryIds.join(',');
    this.NotifyCategory.next(categories);
  }

}
