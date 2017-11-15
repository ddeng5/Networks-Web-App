import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoipComponent } from './voip.component';

describe('VoipComponent', () => {
  let component: VoipComponent;
  let fixture: ComponentFixture<VoipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
