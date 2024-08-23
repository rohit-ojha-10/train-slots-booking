import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal',
  standalone: true,
  templateUrl: './modal.component.html',
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  private offcanvasService = inject(NgbOffcanvas);

  @ViewChild('content', { static: true }) content!: TemplateRef<any>;

  @Output() seatNumberChange = new EventEmitter<number>();
  @Output() modeChange = new EventEmitter<'auto' | 'manual'>(); // Emit mode change
  @Input() mode: 'auto' | 'manual' = 'auto'; // Default mode

  ngOnInit(): void {
    this.openStaticBackdrop();
  }

  onModeChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      const selectedMode = checkbox.value as 'auto' | 'manual';
      this.mode = selectedMode;
      this.modeChange.emit(this.mode);
    }
  }

  onSeatNumberChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedSeats = parseInt(selectElement.value, 10);
    this.seatNumberChange.emit(selectedSeats); // Emit the selected number of seats
  }
  openStaticBackdrop() {
    this.offcanvasService.open(this.content, { backdrop: 'static' });
  }

  
}
