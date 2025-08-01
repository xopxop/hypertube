import { Routes } from "@angular/router";
import { HomePage } from "../../home-page/home-page.component";
import { Login } from "./login/login.component";
import { MovieList } from "./movie-list/movie-list.component";
import { Signup } from "./signup/signup.component";

export const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'movies',
    component: MovieList
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