export class Pagination{

  pages: number[] = [];
  totalPage: number = 0;
  currentPage: number = 1;
  perPage:number = 0;


  public set Total(value:number){
    this.totalPage = Math.ceil(value / 30);
    this.generatePagination(1);
  }

  constructor(perPage:number = 30){
    this.perPage = perPage;
  }

  generatePagination(startPage: number) {
    this.pages = []; // 清除現有頁碼
    let endPage = startPage+9 < this.totalPage ? startPage+9 : this.totalPage;
    console.log(endPage);
    for (let i = startPage; i <= endPage; i++) {
      this.pages.push(i);
    }
  }




  GetPrevNumber() {


    if (this.currentPage > 1) {
      this.currentPage--;
    }
    if (this.currentPage % 10 === 0) {
      this.generatePagination(this.currentPage - 9);
    }

    return this.currentPage;

  }

  GetNextNumber() {
    if (this.currentPage < this.totalPage) {
      this.currentPage++;
    }
    if (this.currentPage % 10 === 1) {
      this.generatePagination(this.currentPage);
    }
    return this.currentPage;

  }



}
