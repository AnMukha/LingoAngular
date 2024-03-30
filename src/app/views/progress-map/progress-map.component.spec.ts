import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressMapComponent } from './progress-map.component';

describe('ProgressMapComponent', () => {
  let component: ProgressMapComponent;
  let fixture: ComponentFixture<ProgressMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgressMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
