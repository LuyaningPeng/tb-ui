import { ComponentFixture, TestBed } from '@angular/core/testing';

import { H2mcHelpComponent } from './h2mc-help.component';

describe('H2mcHelpComponent', () => {
  let component: H2mcHelpComponent;
  let fixture: ComponentFixture<H2mcHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ H2mcHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(H2mcHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
