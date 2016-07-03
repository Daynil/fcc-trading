import { Component, AfterViewInit,
         ViewChild, ElementRef, Renderer } from '@angular/core';

import { AuthService } from '../shared/auth.service';

@Component({
  moduleId: module.id,
  selector: 'settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.css']
})
export class SettingsComponent implements AfterViewInit {
  
  toastText: string = null;

  @ViewChild('name') nameField: ElementRef;
  @ViewChild('city') cityField: ElementRef;
  @ViewChild('state') stateField: ElementRef;
  
  constructor(private authService: AuthService,
              private renderer: Renderer) { }

  ngAfterViewInit() {
    let userInfo = this.authService.creds.user;
    if (userInfo.name) {
      this.renderer.setElementProperty(this.nameField.nativeElement, 'value', userInfo.name);
    }
    if (userInfo.city) {
      this.renderer.setElementProperty(this.cityField.nativeElement, 'value', userInfo.city);
    }
    if (userInfo.state) {
      this.renderer.setElementProperty(this.stateField.nativeElement, 'value', userInfo.state);
    }
  }

  /** Show a notification message */
  toast(text: string) {
    this.toastText = text;
    window.setTimeout(() => this.toastText = null, 2000);
  }

  saveChanges(name: HTMLInputElement, city: HTMLInputElement, state: HTMLInputElement) {
    this.authService
        .updateProfile(name.value, city.value, state.value)
        .then(res => {
          this.toast('User info updated!');
        });
  }

}