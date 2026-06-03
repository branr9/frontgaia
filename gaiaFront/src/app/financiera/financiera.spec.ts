import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Financiera } from './financiera';

describe('Financiera', () => {
  let component: Financiera;
  let fixture: ComponentFixture<Financiera>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Financiera]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Financiera);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
