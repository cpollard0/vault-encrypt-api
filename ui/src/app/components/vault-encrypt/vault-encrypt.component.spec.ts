import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaultEncryptComponent } from './vault-encrypt.component';

describe('VaultEncryptComponent', () => {
  let component: VaultEncryptComponent;
  let fixture: ComponentFixture<VaultEncryptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaultEncryptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaultEncryptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
