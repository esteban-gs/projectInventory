import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerCreateComponent } from './maker-create.component';

describe('MakerCreateComponent', () => {
  let component: MakerCreateComponent;
  let fixture: ComponentFixture<MakerCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
