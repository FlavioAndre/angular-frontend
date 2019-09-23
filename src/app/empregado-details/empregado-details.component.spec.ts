import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpregadoDetailsComponent } from './empregado-details.component';

describe('EmpregadoDetailsComponent', () => {
  let component: EmpregadoDetailsComponent;
  let fixture: ComponentFixture<EmpregadoDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpregadoDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpregadoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
