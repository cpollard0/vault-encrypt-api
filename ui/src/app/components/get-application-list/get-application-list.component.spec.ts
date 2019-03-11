import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetApplicationListComponent } from './get-application-list.component';

describe('GetApplicationListComponent', () => {
  let component: GetApplicationListComponent;
  let fixture: ComponentFixture<GetApplicationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetApplicationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetApplicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
