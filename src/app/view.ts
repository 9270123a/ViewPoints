export class ViewAPIModel{
  data:View[] = [];
  total:number = 0;
}

export class View {
  name:string = ""
  images:Image[] = []
  description:string = ""
  address :string = ""
  category:string = ""
}

export class CategoryDate {
  id:string = ""
  name:string = ""
}

export class Image {
  ext:string = ""
  src:string = "https://i0.wp.com/www.fotobeginner.com/wp-content/uploads/2013/08/31.jpg?resize=645%2C429&ssl=1"
  subject:string = ""
}

export class Data{
  total: number = 0;
  data:View[] =[];
  filteredData: any;
}
