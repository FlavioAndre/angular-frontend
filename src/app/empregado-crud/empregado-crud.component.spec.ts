import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpregadoCrudComponent } from './empregado-crud.component';

describe('EmpregadoCrudComponent', () => {
  let component: EmpregadoCrudComponent;
  let fixture: ComponentFixture<EmpregadoCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpregadoCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpregadoCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
