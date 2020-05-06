import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/common/book';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-list',
 // templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[]=[];
  currentCategoryId: number = 1;
  searchMode : boolean = false;
  
  //new properties for server side paging
  currentPage = 1;
  pageSize: number = 5;
  totalRecords: number = 0;

  constructor(private _bookService: BookService,
              private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
     this._activatedRoute.paramMap.subscribe(
      () => {
        this.listBooks();
      }
    );
  }

   

  listBooks(){

    this.searchMode = this._activatedRoute.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      //do search work
      this.handleSearchBooks();
    }else{
      //display books based on category
      this.handleListBooks();
    }
  }

  handleListBooks(){
    const hasCategoryId : boolean= this._activatedRoute.snapshot.paramMap.has('id');
    if(hasCategoryId){
       this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
    }

    this._bookService.getBooks(this.currentCategoryId, this.currentPage - 1, this.pageSize)
        .subscribe(
            this.processPaginate()
          );
  }

  handleSearchBooks(){
    const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword');

    this._bookService.searchBooks(keyword).subscribe(
      data => {
        this.books = data;
      }
    )
  }

  updatePageSize(pageSize: number){
     this.pageSize = pageSize;
     this.listBooks();
  }
  processPaginate(){
    return data => {
      this.books = data._embedded.books;
      //page number starts from 1 index
      this.currentPage = data.page.number + 1;
      this.totalRecords = data.page.totalElements;
      this.pageSize = data.page.size;
    }
  }
}
