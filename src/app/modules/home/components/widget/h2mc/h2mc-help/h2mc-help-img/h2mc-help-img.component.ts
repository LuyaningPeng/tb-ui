import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'tb-h2mc-help-img',
  templateUrl: './h2mc-help-img.component.html',
  styleUrls: ['./h2mc-help-img.component.scss']
})
export class H2mcHelpImgComponent implements OnInit {

  @Input() img_src: string;

  show: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
