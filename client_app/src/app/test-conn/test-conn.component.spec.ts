import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestConnComponent } from './test-conn.component';

describe('TestConnComponent', () => {
  let component: TestConnComponent;
  let fixture: ComponentFixture<TestConnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestConnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestConnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
