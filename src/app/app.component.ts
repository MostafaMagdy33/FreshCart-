import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./Core/layout/navbar/navbar.component";
import { FooterComponent } from "./Core/layout/footer/footer.component";
import { NgxSpinnerModule } from "ngx-spinner";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent , NgxSpinnerModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FinalProject';

}




