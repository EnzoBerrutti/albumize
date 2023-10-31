import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileReviewsPageComponent } from './profile-reviews-page.component';

describe('ProfileReviewsPageComponent', () => {
  let component: ProfileReviewsPageComponent;
  let fixture: ComponentFixture<ProfileReviewsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileReviewsPageComponent]
    });
    fixture = TestBed.createComponent(ProfileReviewsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
