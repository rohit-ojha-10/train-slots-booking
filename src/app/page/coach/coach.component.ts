import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlotComponent } from './components/slot/slot.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { CoreModule } from '../../core/core.module';
import { SeatManagementService } from '../../core/services/seat-management.service.ts.service';
import { Slot } from './components/slot/slot.model';

// Train coach main component
@Component({
  selector: 'coach',
  standalone: true,
  imports: [SlotComponent, CommonModule, ModalComponent, CoreModule],
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.css'],
})

export class CoachComponent implements OnInit {
  @ViewChild(ModalComponent) modalComponent!: ModalComponent; // to control seat selection modal visibility

  slots: Slot[];
  mode: 'auto' | 'manual';

  constructor(private SeatManagementService: SeatManagementService) {
    // injected SeatManagementService
    this.slots = this.SeatManagementService.getSlots(); // getting current state of slots
    this.mode = 'auto';
  }

  ngOnInit(): void {}

  onSeatNumberChange(selectedSeats: number): void {
    // set the number of seats selected (for auto mode)
    this.SeatManagementService.setNumberOfSeats(selectedSeats);
  }

  onModeChange(mode: 'auto' | 'manual'): void {
    // set mode of seat selection
    this.mode = mode;
  }

  toggleSelection(index: number): void {
    if (this.mode === 'manual')
      // manual selection of seats
      this.SeatManagementService.toggleSelection(index);
    else this.selectSeats(index);
  }

  selectSeats(index: number): void {
    // automatic selection of closest seats
    this.SeatManagementService.selectSeats(index);
  }

  bookSeats(): void {
    // book seats in the server/db
    this.SeatManagementService.bookSeats();
  }
  resetSeats(): void {
    // reset all seats as un-booked (for testing)
    this.SeatManagementService.resetBookedSeats(); // service for reset
    this.slots = this.SeatManagementService.getSlots(); // Refresh slots
    this.openSeatSelectionModal();
  }
  openSeatSelectionModal(): void {
    this.modalComponent.openStaticBackdrop();
  }
}
