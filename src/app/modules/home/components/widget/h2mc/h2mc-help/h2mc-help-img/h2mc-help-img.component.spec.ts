import { ComponentFixture, TestBed } from '@angular/core/testing';

import { H2mcHelpImgComponent } from './h2mc-help-img.component';

describe('H2mcHelpImgComponent', () => {
  let component: H2mcHelpImgComponent;
  let fixture: ComponentFixture<H2mcHelpImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ H2mcHelpImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(H2mcHelpImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
