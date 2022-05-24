import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearhBlockComponent } from './searh-block.component';

describe('SearhBlockComponent', () => {
  let component: SearhBlockComponent;
  let fixture: ComponentFixture<SearhBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearhBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearhBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
