import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWorkshopComponent } from './chat-workshop.component';

describe('ChatWorkshopComponent', () => {
  let component: ChatWorkshopComponent;
  let fixture: ComponentFixture<ChatWorkshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatWorkshopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
