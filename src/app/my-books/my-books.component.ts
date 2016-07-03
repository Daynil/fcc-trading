import { Component, OnInit, OnChanges } from '@angular/core';
import * as _ from 'lodash';

import { AuthService } from '../shared/auth.service';
import { BooksService } from '../shared/books.service';
import { Book } from '../shared/book.model';

@Component({
  moduleId: module.id,
  selector: 'my-books',
  templateUrl: 'my-books.component.html',
  styleUrls: ['my-books.component.css']
})
export class MyBooksComponent implements OnInit, OnChanges {

  displayTrades: Book[] = null;
  tradeTitle: string;
  displayType: string;
  myTrades: Book[];
  otherTrades: Book[];

  toastText: string = null;

  constructor(private booksService: BooksService,
              private authService: AuthService) { }

  ngOnInit() {
    this.refreshTrades();
  }

  ngOnChanges() {
    this.refreshTrades();
  }

  refreshTrades() {
    this.myTrades = _.filter(this.booksService.allBooks, d => d.tradeRequester === this.authService.creds.user.username);
    this.otherTrades = _.filter(this.booksService.userBooks, d => d.tradeRequester);
    if (this.displayTrades) this.showTrades(this.displayType);
  }

  addBook(bookInput: HTMLInputElement) {
    if (bookInput.value.length < 1) return;
    this.booksService
        .getBook(bookInput.value)
        .then(res => {
          console.log(res);
          bookInput.value = '';
        });
  }

  showTrades(type: string) {
    if (type === 'mine') {
      this.displayType = 'mine';
      this.displayTrades = this.myTrades.slice();
      this.tradeTitle = 'My Requests';
    }
    if (type === 'other') {
      this.displayType = 'other';
      this.displayTrades = this.otherTrades.slice();
      this.tradeTitle = 'Requests from others'
    }
  }

  hideTrades() {
    if (this.displayTrades) {
      this.displayTrades = null;
    }
  }

  acceptTrade(displayType, accepted: boolean, book: Book) {
    if (displayType === 'mine') {
      book.tradeRequester = null;
      this.booksService.updateBook(book);
      this.refreshTrades();
      this.booksService
          .cancelRequest(book)
          .then(res => this.toast('Trade request cancelled'));
    }
    else {
      if (accepted) {
        book.owner = book.tradeRequester;
      }
      book.tradeRequester = null;
      this.booksService.updateBook(book);
      this.refreshTrades();
      this.booksService
          .acceptTrade(accepted, book)
          .then(res => this.toast(`Trade ${accepted ? 'accepted' : 'declined'}!`));
    }
  }

  /** Show a notification message */
  toast(text: string) {
    this.toastText = text;
    window.setTimeout(() => this.toastText = null, 2000);
  }


}