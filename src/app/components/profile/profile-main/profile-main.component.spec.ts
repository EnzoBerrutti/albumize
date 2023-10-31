import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMainComponent } from './profile-main.component';

describe('ProfileMainComponent', () => {
  let component: ProfileMainComponent;
  let fixture: ComponentFixture<ProfileMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileMainComponent]
    });
    fixture = TestBed.createComponent(ProfileMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
