import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/toPromise";

import { AuthService } from './auth.service';
import { Book } from './book.model';
import { User, Credentials } from './user.model';
import { handleError, parseJson } from './http-helpers';

@Injectable()
export class BooksService {

  allBooks: Book[] = [];
  userBooks: Book[] = [];

  constructor(private http: Http, private authService: AuthService) { }

  getBook(book: string) {
    return this.http
                .get(`/api/getbook/${book}`)
                .toPromise()
                .then(parseJson)
                .then(res => {
                  let firstResult = this.formatBook(res[0]);
                  this.allBooks.push(firstResult);
                  return firstResult;
                })
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
}