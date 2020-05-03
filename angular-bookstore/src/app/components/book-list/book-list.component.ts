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

    const hasCategoryId : boolean= this._activatedRoute.snapshot.paramMap.has('id');
    if(hasCategoryId){
       this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
    }

    this._bookService.getBooks(this.currentCategoryId).subscribe(
      data =>  this.books=data
      
    )
  }
}
