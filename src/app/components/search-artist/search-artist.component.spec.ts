import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchArtistComponent } from './search-artist.component';

describe('SearchArtistComponent', () => {
  let component: SearchArtistComponent;
  let fixture: ComponentFixture<SearchArtistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchArtistComponent]
    });
    fixture = TestBed.createComponent(SearchArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
