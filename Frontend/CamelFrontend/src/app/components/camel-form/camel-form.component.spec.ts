import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CamelFormComponent } from './camel-form.component';
import { provideHttpClient } from '@angular/common/http';

describe('CamelFormComponent', () => {
  let component: CamelFormComponent;
  let fixture: ComponentFixture<CamelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CamelFormComponent, ReactiveFormsModule],
      providers: [provideHttpClient()]
    }).compileComponents();

    fixture = TestBed.createComponent(CamelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('formnak érvénytelennek kell lennie, ha üres', () => {
    expect(component.camelForm.valid).toBeFalsy();
  });

  it('humpCount csak 1 vagy 2 lehet', () => {
    const hump = component.camelForm.controls['humpCount'];
    hump.setValue(3);
    expect(hump.valid).toBeFalsy();
    hump.setValue(2);
    expect(hump.valid).toBeTruthy();
  });
});