import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/services/localService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _localService: LocalService, private router: Router) { }

  signOff() {
    console.log("Le di en sign off")
    this.setLocalStorage('', 'admin');
    this.setLocalStorage('', 'username');
    this.setLocalStorage('', 'user-token');
    this.router.navigate(['/login']);
  }

  setLocalStorage(token: string, key: string) {
    this._localService.setJsonValue(key, token);
  }

  ngOnInit(): void {
  }
}
