import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Puntuacion } from './puntuacion';

describe('Puntuacion', () => {
  let component: Puntuacion;
  let fixture: ComponentFixture<Puntuacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Puntuacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Puntuacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
