import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'hypertube';
  magnet = '';
  videoUrl = signal('');

  getStreamUrl(magnet: string): string {
    return `http://localhost:3000/stream?magnet=${encodeURIComponent(magnet)}`;
  }

  loadVideo() {
    if (!this.magnet) return;
    this.videoUrl.set(this.getStreamUrl(this.magnet));
  }
}
