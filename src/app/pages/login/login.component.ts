import { Component, OnInit } from '@angular/core';
import '../../../assets/login-animation.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  message: string;
  error: string;

  constructor() { }

  ngOnInit(): void {
  }

  login(){

  }

  ngAfterViewInit() {
    (window as any).initialize();
  }


}