import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'tb-h2mc',
  templateUrl: './h2mc.component.html',
  styleUrls: ['./h2mc.component.scss']
})
export class H2mcComponent implements OnInit {

  @Input() entityId;

  @ViewChild('alarm_img') alarm_img:any;

  private yellow_src = '../assets/alarm_yellow.png'
  private red_src = '../assets/alarm_red.png'
  public current_src='../assets/alarm_red.png'

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    // this.twinkle()
  }

  goDeviceDetail(): void{
    const entityId = this.entityId
    const url = '/devices/'+entityId
    this.router.navigate([url]);
  }

  // twinkle():void{
  //   let count =0;
  //   setInterval(() =>{
  //     if (count%2===0) {
  //       this.current_src = this.yellow_src
  //     }
  //     else{
  //       this.current_src = this.red_src
  //     }
  //     this.alarm_img.nativeElement.setAttribute('src', this.current_src)
  //     count++
  //   },1000)
  // }
}
