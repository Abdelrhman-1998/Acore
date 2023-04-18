import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectChipsComponent } from './multi-select-chips.component';

describe('MultiSelectChipsComponent', () => {
  let component: MultiSelectChipsComponent;
  let fixture: ComponentFixture<MultiSelectChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiSelectChipsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiSelectChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
