import { Routes } from "@angular/router";
import { HomePage } from "./torrent/torrent.component";
import { Login } from "./login/login.component";
import { MovieList } from "./movie-list/movie-list.component";
import { Signup } from "./signup/signup.component";

export const routes: Routes = [
  {
    path: '',
    component: MovieList
  },
  {
    path: 'stream',
    component: HomePage
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'signup',
    component: Signup
  }
];