import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AdeccoWeb';
  showHead = true;

  constructor(private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (
          (event['url'] == '') ||
          (event['url'] == '/') ||
          (event['url'] == '/login') ||
          (event['url'] == '/register')
        ) {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    });
  }
}
