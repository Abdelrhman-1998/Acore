import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponet} from './dashboardcomponent';

describe('BooksComponent', () => {
  let component: DashboardComponet;
  let fixture: ComponentFixture<DashboardComponet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
