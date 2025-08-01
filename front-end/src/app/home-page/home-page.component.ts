import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  standalone: true,
  imports: [ FormsModule, CommonModule ],
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePage {
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