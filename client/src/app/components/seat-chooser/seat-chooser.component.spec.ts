import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeatChooserComponent } from './seat-chooser.component';

describe('SeatChooserComponent', () => {
  let component: SeatChooserComponent;
  let fixture: ComponentFixture<SeatChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatChooserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});