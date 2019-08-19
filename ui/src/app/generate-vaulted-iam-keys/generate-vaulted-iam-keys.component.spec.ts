import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateVaultedIamKeysComponent } from './generate-vaulted-iam-keys.component';

describe('GenerateVaultedIamKeysComponent', () => {
  let component: GenerateVaultedIamKeysComponent;
  let fixture: ComponentFixture<GenerateVaultedIamKeysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateVaultedIamKeysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateVaultedIamKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
