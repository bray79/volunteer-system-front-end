import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVolunteerComponent } from './manage-volunteer.component';

describe('ManageVolunteerComponent', () => {
  let component: ManageVolunteerComponent;
  let fixture: ComponentFixture<ManageVolunteerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageVolunteerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
