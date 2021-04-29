import { Component, OnInit } from '@angular/core';
import { LocalService } from 'src/app/services/localService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string = '';
  admin: boolean = false;

  constructor(private localService: LocalService) { }

  ngOnInit(): void {
    this.username = this.localService.getJsonValue('username');
    this.admin = this.localService.getJsonValue('admin');
  }
}
