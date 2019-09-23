import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteDetatalhesComponent } from './cliente-detatalhes.component';

describe('ClienteDetatalhesComponent', () => {
  let component: ClienteDetatalhesComponent;
  let fixture: ComponentFixture<ClienteDetatalhesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteDetatalhesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteDetatalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
