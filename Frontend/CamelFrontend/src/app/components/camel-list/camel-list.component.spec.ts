import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { CamelListComponent } from './camel-list.component';

describe('CamelListComponent', () => {
  let component: CamelListComponent;
  let fixture: ComponentFixture<CamelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CamelListComponent],
      providers: [provideHttpClient()] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

