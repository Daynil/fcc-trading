import {Component} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';

@Component({
	selector: 'my-app',
	templateUrl: '../html/app.html',
	styleUrls: ['../css/app.css'],
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