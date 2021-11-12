import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icons.component.html',

})
export class IconsComponent implements OnInit {

  constructor() { }
  @Input() icon:string=''
  ngOnInit(): void {
  }


}
