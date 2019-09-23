import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpregadoListComponent } from './empregado-list.component';

describe('EmpregadoListComponent', () => {
  let component: EmpregadoListComponent;
  let fixture: ComponentFixture<EmpregadoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpregadoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpregadoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
