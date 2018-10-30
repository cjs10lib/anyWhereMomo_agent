import { LoginResponse } from './../../models/login-response/login-response.model';
import { AuthService } from './../../services/auth-service/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../../models/account/account.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Output() loginStatus: EventEmitter<LoginResponse>;
  account = {} as Account;

  constructor(private router: Router, private authService: AuthService) {
    this.loginStatus = new EventEmitter<LoginResponse>();
  }

  ngOnInit() { }

  async login() {
    const result = await this.authService.signInWithEmailAndPassword(this.account);
    this.loginStatus.emit(result);
  }

  navigateToRegisterPage() {
    this.router.navigate(['register']);
  }

}
