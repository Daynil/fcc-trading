import { Component, OnInit } from '@angular/core';

import { BooksService } from '../shared/books.service';

@Component({
  moduleId: module.id,
  selector: 'all-books',
  templateUrl: 'all-books.component.html',
  styleUrls: ['all-books.component.css']
})
export class AllBooksComponent implements OnInit {

  constructor(private booksService: BooksService) { }

  ngOnInit() {
    this.booksService.getAllBooks();
  }

}