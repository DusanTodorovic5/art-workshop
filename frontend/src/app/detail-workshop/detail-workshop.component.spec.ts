import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailWorkshopComponent } from './detail-workshop.component';

describe('DetailWorkshopComponent', () => {
  let component: DetailWorkshopComponent;
  let fixture: ComponentFixture<DetailWorkshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailWorkshopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
