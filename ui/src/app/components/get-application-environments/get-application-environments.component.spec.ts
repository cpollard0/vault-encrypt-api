import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetApplicationEnvironmentsComponent } from './get-application-environments.component';

describe('GetApplicationEnvironmentsComponent', () => {
  let component: GetApplicationEnvironmentsComponent;
  let fixture: ComponentFixture<GetApplicationEnvironmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetApplicationEnvironmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetApplicationEnvironmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
