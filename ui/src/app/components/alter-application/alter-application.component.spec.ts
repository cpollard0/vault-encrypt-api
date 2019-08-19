import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterApplicationComponent } from './alter-application.component';

describe('AlterApplicationComponent', () => {
  let component: AlterApplicationComponent;
  let fixture: ComponentFixture<AlterApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
