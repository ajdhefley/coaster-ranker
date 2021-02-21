import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoasterSearchComponent } from './coaster-search.component';

describe('CoasterSearchComponent', () => {
  let component: CoasterSearchComponent;
  let fixture: ComponentFixture<CoasterSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoasterSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoasterSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});