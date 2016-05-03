import {Component} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';

@Component({
	selector: 'my-app',
	styleUrls: ['../css/app.css'],
	providers: HTTP_PROVIDERS,
	template: `
		<h1>Hello Alice</h1>
		<p>Server Data: {{ serverData }}</p>
	`
})
export class AppComponent {
	serverData: string;
	
	constructor(private http: Http) { 
		this.http.get('/test')
			.subscribe((res:any) => {
				this.serverData = res._body;
			});
	}
	
}