import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Movie } from '../../../models/movie.interface';

@Component({
  selector: 'app-movie-list',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatChipsModule, MatIconModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieList {
  movies = signal<Movie[]>([
    {
      id: 1,
      title: 'The Shawshank Redemption',
      year: 1994,
      genre: ['Drama'],
      rating: 9.3,
      poster: 'https://via.placeholder.com/300x450?text=Movie+Poster',
      description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      duration: 142
    },
    {
      id: 2,
      title: 'The Godfather',
      year: 1972,
      genre: ['Crime', 'Drama'],
      rating: 9.2,
      poster: 'https://via.placeholder.com/300x450?text=Movie+Poster',
      description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
      duration: 175
    },
    {
      id: 3,
      title: 'The Dark Knight',
      year: 2008,
      genre: ['Action', 'Crime', 'Drama'],
      rating: 9.0,
      poster: 'https://via.placeholder.com/300x450?text=Movie+Poster',
      description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
      duration: 152
    }
  ]);

  playMovie(movie: Movie) {
    console.log('Playing movie:', movie.title);
  }
}
