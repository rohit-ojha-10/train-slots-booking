import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoachComponent } from './page/coach/coach.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CoachComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'train-slots-booking';
}
