import { Component } from '@angular/core';
import { Http, HTTP_PROVIDERS } from '@angular/http';

import { CheshireCatComponent } from './cheshire-cat/cheshire-cat.component';

@Component({
	selector: 'my-app',
	templateUrl: 'app/app.component.html',
	styleUrls: ['app/app.component.css'],
	directives: [CheshireCatComponent],
	providers: HTTP_PROVIDERS
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