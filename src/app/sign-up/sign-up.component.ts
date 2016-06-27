import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'sign-up',
  templateUrl: 'sign-up.component.html',
  styleUrls: ['sign-up.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class SignUpComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

}