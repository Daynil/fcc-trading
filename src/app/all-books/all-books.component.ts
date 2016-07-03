import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { AuthService } from '../shared/auth.service';
import { BooksService } from '../shared/books.service';
import { Book } from '../shared/book.model';

@Component({
  moduleId: module.id,
  selector: 'all-books',
  templateUrl: 'all-books.component.html',
  styleUrls: ['all-books.component.css']
})
export class AllBooksComponent implements OnInit {

  toastText: string = null;

  constructor(private booksService: BooksService,
              private authService: AuthService) { }

  ngOnInit() { }

  /** Only show trade badge if user is logged in and they don't own the book */
  isOwnBook(book: Book): boolean {
    if (this.authService.creds.user === null) return true;
    if (book.owner === this.authService.creds.user.username ||
        _.find(this.booksService.userBooks, d => d.id === book.id)) return true;
    return false;
  }

  requestTrade(book: Book) {
    if (book.tradeRequester) {
      this.toast('Book already has a pending trade');
      return;
    }
    book.tradeRequester = this.authService.creds.user.username;
    this.booksService.updateBook(book);
    this.booksService
        .initiateTrade(book)
        .then(res => {
          if (res.message === 'trade requested') this.toast('Trade requested!');
        });
  }

  /** Show a notification message */
  toast(text: string) {
    this.toastText = text;
    window.setTimeout(() => this.toastText = null, 2000);
  }

}