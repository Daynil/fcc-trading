import { Component, OnInit } from '@angular/core';

import { BooksService } from '../shared/books.service';

@Component({
  moduleId: module.id,
  selector: 'my-books',
  templateUrl: 'my-books.component.html',
  styleUrls: ['my-books.component.css']
})
export class MyBooksComponent implements OnInit {

  constructor(private booksService: BooksService) { }

  ngOnInit() { }

  addBook(bookInput: HTMLInputElement) {
    if (bookInput.value.length < 1) return;
    this.booksService
        .getBook(bookInput.value)
        .then(res => {
          console.log(res);
          bookInput.value = '';
        });
  }

}