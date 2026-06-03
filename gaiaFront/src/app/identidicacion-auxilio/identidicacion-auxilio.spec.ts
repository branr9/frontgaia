import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentidicacionAuxilio } from './identidicacion-auxilio';

describe('IdentidicacionAuxilio', () => {
  let component: IdentidicacionAuxilio;
  let fixture: ComponentFixture<IdentidicacionAuxilio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdentidicacionAuxilio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdentidicacionAuxilio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
