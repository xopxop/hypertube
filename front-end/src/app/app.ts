import { Component } from '@angular/core';
import { AppHeaderComponent } from "./components/app-header.component";
import { AppFooterComponent } from "./components/app-footer.component";
import { AppContentComponent } from "./components/app-content/app-content.component";

@Component({
  selector: 'app-root',
  imports: [AppHeaderComponent, AppFooterComponent, AppContentComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'hypertube';
}
