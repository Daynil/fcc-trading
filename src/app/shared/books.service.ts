import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/toPromise";
import * as _ from 'lodash';

import { AuthService } from './auth.service';
import { Book } from './book.model';
import { User, Credentials } from './user.model';
import { handleError, parseJson, packageForPost } from './http-helpers';

@Injectable()
export class BooksService {

  allBooks: Book[] = [];
  userBooks: Book[] = [];

  constructor(private http: Http, 
              private authService: AuthService) {
                this.authService.logEvent.subscribe(logged => {
                  if (logged.loggedIn) this.updateUserBooks();
                })
              }

  getAllBooks() {
    return this.http
                .get('/api/allbooks')
                .toPromise()
                .then(parseJson)
                .then(res => {
                  this.allBooks = res;
                })
                .catch(handleError);
  }

  getBook(book: string) {
    return this.http
                .get(`/api/getbook/${book}`)
                .toPromise()
                .then(parseJson)
                .then(res => {
                  let firstResult = this.formatBook(res[0]);
                  let existingBook = _.find(this.allBooks, d => d.id === firstResult.id);
                  if (typeof existingBook !== 'undefined') return null;
                  this.allBooks.push(firstResult);
                  this.updateUserBooks();
                  return firstResult;
                })
                .then(this.saveBook.bind(this))
                .catch(handleError);
  }

  saveBook(book: Book) {
    if (book === null) return Promise.resolve(null);
    let dataPackage = packageForPost(book);
    return this.http
                .post('/api/book', dataPackage.body, dataPackage.options)
                .toPromise()
                .then(parseJson)
                .catch(handleError);
  }

  formatBook(googleBook) {
    let book: Book = <Book>{};
    book.id = googleBook.id;
    book.title = googleBook.title;
    book.link = googleBook.link;
    book.thumbnailUrl = googleBook.thumbnail;
    book.owner = this.authService.creds.user.username;
    return book;
  }

  updateUserBooks() {
    this.userBooks = _.filter(this.allBooks, d => d.owner === this.authService.creds.user.username);
  }

  updateBook(changedBook: Book) {
    let oldBook = _.find(this.allBooks, d => d.id === changedBook.id);
    oldBook = _.clone(changedBook);
    this.updateUserBooks();
  }

  initiateTrade(book: Book) {
    let dataPackage = packageForPost(book);
    return this.http
                .post('/api/trade/request', dataPackage.body, dataPackage.options)
                .toPromise()
                .then(parseJson)
                .catch(handleError);
  }

  acceptTrade(accepted: boolean, book: Book) {
    let data = {
      accepted: accepted,
      book: book
    };
    let dataPackage = packageForPost(data);
    return this.http
                .post('/api/trade/accept', dataPackage.body, dataPackage.options)
                .toPromise()
                .then(parseJson)
                .catch(handleError);
  }

  cancelRequest(book: Book) {
    let dataPackage = packageForPost(book);
    return this.http
                .post('/api/trade/cancel', dataPackage.body, dataPackage.options)
                .toPromise()
                .then(parseJson)
                .catch(handleError);
  }

}