import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CamelService } from '../../services/camel.service';

@Component({
  selector: 'app-camel-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './camel-form.component.html'
})

export class CamelFormComponent implements OnInit {
  camelForm: FormGroup;
  isEditMode = false;
  @Output() saved = new EventEmitter<void>();

  colors = ['Sárga', 'Barna', 'Fehér', 'Fekete'];

  constructor(private fb: FormBuilder, private camelService: CamelService) {
    this.camelForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
      color: ['Barna'],
      humpCount: [1, [Validators.required, Validators.min(1), Validators.max(2)]]
    });
  }

  ngOnInit(): void {
    this.camelService.edit$.subscribe(camel => {
      this.isEditMode = true;
      this.camelForm.patchValue(camel);
    });
  }

  onSubmit(): void {
    if (this.camelForm.valid) {
      const camelData = this.camelForm.value;

      const request = this.isEditMode
        ? this.camelService.updateCamel(camelData.id, camelData)
        : this.camelService.createCamel(camelData);

      request.subscribe({
        next: () => {
          alert('Sikeres mentés!');
          this.saved.emit();
          this.resetForm();
        },
        error: (err) => console.error('Hiba mentéskor', err)
      });
    }
  }
  resetForm() {
    this.isEditMode = false;
    this.camelForm.reset({ humpCount: 1, color: 'Barna' });
  }
}