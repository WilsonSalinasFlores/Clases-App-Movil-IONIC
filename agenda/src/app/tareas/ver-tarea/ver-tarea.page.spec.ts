import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerTareaPage } from './ver-tarea.page';

describe('VerTareaPage', () => {
  let component: VerTareaPage;
  let fixture: ComponentFixture<VerTareaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerTareaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
