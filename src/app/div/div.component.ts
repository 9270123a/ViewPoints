import { Component, Input } from '@angular/core';
import { View } from '../view';

@Component({
  selector: 'app-div',
  templateUrl: './div.component.html',
  styleUrl: './div.component.css'
})
export class DivComponent {

  @Input("data") data:View = new View();

}
