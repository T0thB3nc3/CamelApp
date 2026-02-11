import { Component } from '@angular/core';
import { CamelListComponent } from './components/camel-list/camel-list.component';
import { CamelFormComponent } from './components/camel-form/camel-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CamelListComponent, CamelFormComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent { }