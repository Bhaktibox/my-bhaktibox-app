import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDeliveriesComponent } from './assign-deliveries.component';

describe('AssignDeliveriesComponent', () => {
  let component: AssignDeliveriesComponent;
  let fixture: ComponentFixture<AssignDeliveriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignDeliveriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
