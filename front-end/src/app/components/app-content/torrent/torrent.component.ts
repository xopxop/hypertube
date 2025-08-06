import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component({
  standalone: true,
  imports: [ FormsModule, CommonModule ],
  selector: 'torrent',
  templateUrl: './torrent.component.html',
  styleUrls: ['./torrent.component.scss']
})
export class HomePage {
  magnet = '';
  videoUrl = signal('');

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['magnet']) {
        this.videoUrl.set(this.getStreamUrl(params['magnet']));
      }
    });
  }

  getStreamUrl(magnet: string): string {
    return `http://localhost:3000/api/movie/stream?magnet=${encodeURIComponent(magnet)}`;
  }
}