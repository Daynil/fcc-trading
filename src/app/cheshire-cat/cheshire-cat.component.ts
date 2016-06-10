import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'cheshire-cat',
	templateUrl: 'app/cheshire-cat/cheshire-cat.component.html',
	styleUrls: ['app/cheshire-cat/cheshire-cat.component.css']
})
export class CheshireCatComponent implements OnInit {
	cheshireAscii = `
           .'/   /'.					
         .'.-.'-'.-.'.					
    ..._:   .-. .-.   :_...				
  .'    '-.(o ) (o ).-'    '.			
 :  _    _ _'~(_)~'_ _    _  :			
:  /:   ' .-=_   _=-. '   ;/  :			
:   :|-.._  '     '  _..-|:   :			
 :   ':| |':-:-.-:-:'| |:'   :			
  '.   '.| | | | | | |.'   .'			
    '.   '-:_| | |_:-'   .'				
      '-._   ''''    _.-'				
          ''-------''					
	`;

	constructor() { }

	ngOnInit() { }

}