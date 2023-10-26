import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewInAlbumPageComponent } from './review-in-album-page.component';

describe('ReviewInAlbumPageComponent', () => {
  let component: ReviewInAlbumPageComponent;
  let fixture: ComponentFixture<ReviewInAlbumPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewInAlbumPageComponent]
    });
    fixture = TestBed.createComponent(ReviewInAlbumPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
