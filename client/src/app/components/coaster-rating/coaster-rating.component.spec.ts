import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoasterRatingComponent } from './coaster-rating.component';

describe('CoasterRatingComponent', () => {
  let component: CoasterRatingComponent;
  let fixture: ComponentFixture<CoasterRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoasterRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoasterRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});