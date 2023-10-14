import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloAndButtonComponent } from './hello-and-button.component';

describe('HelloAndButtonComponent', () => {
  let component: HelloAndButtonComponent;
  let fixture: ComponentFixture<HelloAndButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HelloAndButtonComponent]
    });
    fixture = TestBed.createComponent(HelloAndButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
