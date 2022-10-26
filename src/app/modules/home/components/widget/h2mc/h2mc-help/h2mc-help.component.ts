import { Component, OnInit, ViewChild } from '@angular/core';
import {display} from 'html2canvas/dist/types/css/property-descriptors/display';

@Component({
  selector: 'tb-h2mc-help',
  templateUrl: './h2mc-help.component.html',
  styleUrls: ['./h2mc-help.component.scss']
})
export class H2mcHelpComponent implements OnInit {

  show: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
