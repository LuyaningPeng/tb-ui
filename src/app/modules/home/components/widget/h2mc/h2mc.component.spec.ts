import { ComponentFixture, TestBed } from '@angular/core/testing';

import { H2mcComponent } from './h2mc.component';

describe('H2mcComponent', () => {
  let component: H2mcComponent;
  let fixture: ComponentFixture<H2mcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ H2mcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(H2mcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
