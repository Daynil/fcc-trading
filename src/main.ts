import { bootstrap }    from '@angular/platform-browser-dynamic';
import { enableProdMode } from "@angular/core";

import { AppComponent } from './app/app.component';

// enableProdMode();

bootstrap(AppComponent)
  .then(success => console.log(`Bootstrap success`))
  .catch(error => console.log(error));