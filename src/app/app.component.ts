import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { SidenavbarComponent } from './layout/sidenavbar/sidenavbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ApiService } from './app.service';
import { LoaderComponent } from './shared/components/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidenavbarComponent, FooterComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'people-hub';
  sidebarVisible = false;
  isLoginPage = false;

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.urlAfterRedirects === '/login' || event.urlAfterRedirects === '/' || event.urlAfterRedirects === '/signup';
      }
    });
  }

  ngOnInit() {
    // this.apiService.getMessage().subscribe((response: any) => {
    //   console.log(response);
    // });
  }
}
