import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image, View, ViewAPIModel } from './view';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewPointServiceService {


  private baseUrl = 'https://www.travel.taipei/open-api/zh-tw/Attractions/All?page=';
  constructor(private http:HttpClient) { }



  getViewDatas(page: number) {
    const url = `${this.baseUrl}${page}`;
    return this.http.get<ViewAPIModel>(url).pipe(map(data => {
      data.data.map(view => {
        if (view.images.length == 0) {
          view.images.push(new Image());
        }
        return view;
      })
      return data;
    }))
  }




  getViewDataByCategory(page: number, categoryIds: string | string[]) {
    let url = `${this.baseUrl}${page}`;

    if (categoryIds && ((Array.isArray(categoryIds) && categoryIds.length > 0) || (typeof categoryIds === 'string' && categoryIds.length > 0))) {
        const ids = Array.isArray(categoryIds) ? categoryIds.join(',') : categoryIds;
        url += `&categoryIds=${ids}`;
    }
    console.log("123123")
    return this.http.get<ViewAPIModel>(url).pipe(map(data => {
        return data;
    }));
}



}
