import { Injectable } from '@angular/core';
import { Slot } from '../../page/coach/components/slot/slot.model';

@Injectable({
  providedIn: 'root'
})
export class SeatManagementService {
  private slots: Slot[] = Array.from({ length: 80 }, (_, i) => ({
    index: i,
    selected: false,
    booked: this.isBooked(i), // check if this slot is already booked
  }));
  private maxSeatsPerRow = 7;
  private numberOfSeats = 0; // input

  getSlots() {// get current slots
    return this.slots;
  }
  setNumberOfSeats(numberOfSeats: number) { // set the number of seats entered by user
    this.numberOfSeats = numberOfSeats;
  }

  isBooked(index: number): boolean {
    const bookedSeats = JSON.parse(localStorage.getItem('bookedSeats') || '[]');
    return bookedSeats.includes(index);
  }

selectSeats(index: number) {
  const selectedSeats = new Set<number>();
  const targetCount = this.numberOfSeats;

  // Define row and column
  const row = Math.floor(index / this.maxSeatsPerRow);
  const column = index % this.maxSeatsPerRow;

  // Helper function to check if seat is available
  const isAvailable = (i: number) =>
    i >= 0 && i < this.slots.length && !this.slots[i].booked;

  // DFS function
  const dfs = (currentIndex: number, seatsLeft: number, depth: number = 0): boolean => {
    if (seatsLeft === 0) return true;
    if (!isAvailable(currentIndex) || selectedSeats.has(currentIndex)) return false;

    selectedSeats.add(currentIndex);

    // Define row and column for current index
    const currentRow = Math.floor(currentIndex / this.maxSeatsPerRow);
    const currentColumn = currentIndex % this.maxSeatsPerRow;

    // Prioritize left and right
    const directions = [
      { dir: 'left', index: currentIndex - 1, condition: currentColumn > 0 },
      { dir: 'right', index: currentIndex + 1, condition: currentColumn < this.maxSeatsPerRow - 1 },
      { dir: 'up', index: currentIndex - this.maxSeatsPerRow, condition: currentRow > 0 },
      { dir: 'down', index: currentIndex + this.maxSeatsPerRow, condition: currentRow < Math.floor(this.slots.length / this.maxSeatsPerRow) - 1 },
    ];

    // Prioritize directions by left-right, then up-down
    for (const { index: nextIndex, condition } of directions) {
      if (condition && dfs(nextIndex, seatsLeft - 1, depth + 1)) return true;
    }

    // Backtrack if no valid path found
    selectedSeats.delete(currentIndex);
    return false;
  };

  // Start DFS from the initial seat
  dfs(index, targetCount);

  // Mark all slots as not selected first
  this.slots.forEach((slot) => (slot.selected = false));

  // Mark the selected seats
  selectedSeats.forEach((i) => (this.slots[i].selected = true));
}


  toggleSelection(index: number): void { // for manual selection
    const slot = this.slots.find((slot) => slot.index === index);
    if (slot) {
      slot.selected = !slot.selected;
    }
  }

  bookSeats() { // to book seats in the db/server
    const bookedSeats = this.slots
      .filter((slot) => slot.selected)
      .map((slot) => slot.index);
    const alreadyBookedSeats = JSON.parse(
      localStorage.getItem('bookedSeats') || '[]'
    );
    localStorage.setItem(
      'bookedSeats',
      JSON.stringify([...alreadyBookedSeats, ...bookedSeats])
    );

    this.slots.forEach((slot) => {
      if (bookedSeats.includes(slot.index)) {
        slot.booked = true;
        slot.selected = false;
      }
    });
  }
  resetBookedSeats() {
    localStorage.setItem('bookedSeats', JSON.stringify([])); // Clear booked seats in localStorage

    // Update slot statuses
    this.slots.forEach((slot) => {
      slot.booked = false; // Reset booked status
    });
  }
}
