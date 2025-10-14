import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacterComponent } from './manufacter.component';

describe('ManufacterComponent', () => {
  let component: ManufacterComponent;
  let fixture: ComponentFixture<ManufacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
