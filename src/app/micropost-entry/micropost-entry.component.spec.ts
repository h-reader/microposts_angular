import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicropostEntryComponent } from './micropost-entry.component';

describe('MicropostEntryComponent', () => {
  let component: MicropostEntryComponent;
  let fixture: ComponentFixture<MicropostEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicropostEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicropostEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
