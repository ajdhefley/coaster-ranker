import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoasterDetailsComponent } from './coaster-details.component';

describe('CoasterDetailsComponent', () => {
  let component: CoasterDetailsComponent;
  let fixture: ComponentFixture<CoasterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoasterDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});