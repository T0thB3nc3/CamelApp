import { Component,OnInit,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Camel, CamelService } from '../../services/camel.service';

@Component({
  selector: 'app-camel-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './camel-list.component.html',
  styleUrls: ['./camel-list.component.css'],
})

export class CamelListComponent implements OnInit {
  camels: Camel[] = [];

  constructor(private camelService: CamelService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('Lista beazonosítva, adatok lekérése...')
    this.loadCamels();
  }

  loadCamels(): void {
    this.camelService.getCamels().subscribe({
      next: (data) => {
        this.camels = [...data];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Hiba történt a tevék betöltésekor:', err)
    });
  }

  onEdit(camel: Camel): void {
    this.camelService.selectForEdit(camel);
  }

  onFeed(id: number) {
    this.camelService.feedCamel(id).subscribe({
      next: (updatedCamel) => {
        this.camels = this.camels.map(camel => 
          camel.id === id ? {...camel, lastFed: updatedCamel.lastFed} : camel
        );

        this.camels = [...this.camels];
        this.cdr.markForCheck();

        console.log('Teve etetve:', updatedCamel);
      },
      error: (err) => console.error('Hiba etetéskor:', err)
    });
  }

  onDelete(id: number | undefined): void {
    if (id && confirm('Biztosan törölni szeretnéd ezt a tevét?')) {
      this.camelService.deleteCamel(id).subscribe(()=> this.loadCamels());
    }
  }
}
