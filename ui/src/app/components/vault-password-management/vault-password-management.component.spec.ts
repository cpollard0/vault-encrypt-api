import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaultPasswordManagementComponent } from './vault-password-management.component';

describe('VaultPasswordManagementComponent', () => {
  let component: VaultPasswordManagementComponent;
  let fixture: ComponentFixture<VaultPasswordManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaultPasswordManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaultPasswordManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
