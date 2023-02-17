import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeOrgComponent } from './become-org.component';

describe('BecomeOrgComponent', () => {
  let component: BecomeOrgComponent;
  let fixture: ComponentFixture<BecomeOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BecomeOrgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BecomeOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
