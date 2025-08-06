import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Movie } from '../../../models/movie.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatChipsModule, MatIconModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieList {
  movies = signal<Movie[]>([]);

  constructor(private readonly http: HttpClient, private readonly router: Router) {
  }

  ngOnInit() {
    this.http.get<Movie[]>('http://localhost:3000/api/movie/movies').subscribe((data: Movie[]) => {
      this.movies.set(data);
      console.log('Movies loaded:', this.movies());
    });
  }

  playMovie(movie: Movie) {
    console.log('Playing movie:', movie.title);
    if (movie.magnet_link) {
      this.router.navigate(['/stream'], { queryParams: { magnet: movie.magnet_link } });
    }
  }
}
