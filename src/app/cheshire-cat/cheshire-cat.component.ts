import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'cheshire-cat',
  templateUrl: 'cheshire-cat.component.html',
  styleUrls: ['cheshire-cat.component.css']
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