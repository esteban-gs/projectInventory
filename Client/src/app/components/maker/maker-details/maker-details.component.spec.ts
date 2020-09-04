import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerDetailsComponent } from './maker-details.component';

describe('MakerDetailsComponent', () => {
  let component: MakerDetailsComponent;
  let fixture: ComponentFixture<MakerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
