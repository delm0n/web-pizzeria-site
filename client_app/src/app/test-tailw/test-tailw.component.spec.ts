import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTailwComponent } from './test-tailw.component';

describe('TestTailwComponent', () => {
  let component: TestTailwComponent;
  let fixture: ComponentFixture<TestTailwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestTailwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTailwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
