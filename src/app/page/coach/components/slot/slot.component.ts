import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'slot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css']
})
export class SlotComponent {
  @Input() index!: number;
  @Input() selected!: boolean;
  @Input() booked!: boolean;
  @Input() onClick!: (index: number) => void;

  handleClick() { // select this slot
    if (!this.booked) {
      this.onClick(this.index);
    }
  }
}
