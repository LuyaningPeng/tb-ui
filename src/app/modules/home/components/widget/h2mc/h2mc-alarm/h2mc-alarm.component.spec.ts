import { ComponentFixture, TestBed } from '@angular/core/testing';

import { H2mcAlarmComponent } from './h2mc-alarm.component';

describe('H2mcAlarmComponent', () => {
  let component: H2mcAlarmComponent;
  let fixture: ComponentFixture<H2mcAlarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ H2mcAlarmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(H2mcAlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
