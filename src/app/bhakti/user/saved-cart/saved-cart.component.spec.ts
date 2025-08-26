import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedCartComponent } from './saved-cart.component';

describe('SavedCartComponent', () => {
  let component: SavedCartComponent;
  let fixture: ComponentFixture<SavedCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavedCartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SavedCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
