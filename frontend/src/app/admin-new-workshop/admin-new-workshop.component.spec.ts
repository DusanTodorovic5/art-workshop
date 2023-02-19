import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewWorkshopComponent } from './admin-new-workshop.component';

describe('AdminNewWorkshopComponent', () => {
  let component: AdminNewWorkshopComponent;
  let fixture: ComponentFixture<AdminNewWorkshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNewWorkshopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNewWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
