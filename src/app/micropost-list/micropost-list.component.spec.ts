import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicropostListComponent } from './micropost-list.component';

describe('MicropostListComponent', () => {
  let component: MicropostListComponent;
  let fixture: ComponentFixture<MicropostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicropostListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicropostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
