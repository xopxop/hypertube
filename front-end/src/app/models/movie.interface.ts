export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string[];
  rating: number;
  poster: string;
  description: string;
  duration: number;
  magnetLink?: string;
}