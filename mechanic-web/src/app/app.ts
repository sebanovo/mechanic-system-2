import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HealthCheckComponent } from './core/health-check/health-check.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HealthCheckComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mechanic-web');
}
