import {AfterViewChecked, Component, Input, OnInit, AfterViewInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {DeviceService} from '@core/http/device.service';
import {map, take, tap} from 'rxjs/operators';
import {Observable, of, Subscription} from 'rxjs';
import {CustomerService} from '@core/http/customer.service';

@Component({
  selector: 'tb-h2mc-alarm',
  templateUrl: './h2mc-alarm.component.html',
  styleUrls: ['./h2mc-alarm.component.scss']
})
export class H2mcAlarmComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {


  @Input() entityList: any;
  @Input() checked: boolean = true;

  private yellow_src = '../assets/alarm_yellow.png';
  private red_src = '../assets/alarm_red.png';
  public current_src = '../assets/alarm_red.png';

  subscriptList: Subscription[] = [];


  constructor(private router: Router,
              private deviceService: DeviceService,
              private customerService: CustomerService,
              private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log('========ngAfterViewInit===========');
    setTimeout(() => {
      console.log("刷新界面")
      this.ref.markForCheck()
    },1000)
  }

  ngAfterViewChecked(): void {
    console.log('========ngAfterViewChecked===========');
    if (typeof this.entityList !== 'undefined') {
      this.entityList = JSON.parse(JSON.stringify(this.entityList));
      this.getCustomer();

      // setTimeout(() => {
      //   for (let subscript of this.subscriptList) {
      //     subscript.unsubscribe();
      //   }
      // }, 1000 * this.entityList.length);
      //
      // setTimeout(() => {
      //   this.ref.markForCheck()
      // },5000)
    }
  }

  ngOnDestroy(): void {

  }


  getCustomer(): void {
    console.time('Time1')
    for (let i = 0; i < this.entityList.length; i++) {
      let subscriber = this.deviceService.getDeviceInfo(this.entityList[i].entityId)
        .pipe(
          take(1),
          map((data) => data.customerId.id)
        ).subscribe({
          next: (data) => {
            // console.log(`${i}----进入`);
            this.entityList[i].customerId = data;
            this.getCustomerDetail(i, data);
            // console.log(`${i}-----------${JSON.stringify(this.entityList[i], null,2)}`)
            // this.ref.markForCheck();
          },
          error: null,
          complete: () => {
            console.log('结束了');
          }
        });
      // this.subscriptList.push(subscriber);
    }
    console.timeEnd('Time1')
  }

  getCustomerDetail(index: number, customerId: string): void {
    let subscriber = this.customerService.getCustomer(customerId)
      // .pipe(take(1))
      .subscribe(
        (customer) => {
          this.entityList[index].address = customer.address;
          this.entityList[index].customerName = customer.name;
          this.entityList[index].customerPhone = customer.phone;
        }
      );

    // this.subscriptList.push(subscriber);
  }

  goDeviceDetail(entityId: string): void {
    // console.log(JSON.stringify(this.entityList, null, 2));
    const url = '/devices/' + entityId;
    this.router.navigate([url]);
  }

  goCustomerDetail(customerId: string): void {
    const url = '/customers/' + customerId;
    this.router.navigate([url]);
  }


}
