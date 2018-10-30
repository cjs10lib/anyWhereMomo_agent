import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Account } from '../../models/account/account.model';
import { LoginResponse } from '../../models/login-response/login-response.model';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  @Output() loginStatus: EventEmitter<LoginResponse>;
  account = {} as Account;

  constructor(private router: Router, private authService: AuthService) {
    this.loginStatus = new EventEmitter<LoginResponse>();
  }

  ngOnInit() { }

  async register() {
    const result = await this.authService.signUpWithEmailAndPassword(this.account);
    this.loginStatus.emit(result);
  }

  navigateToLoginPage() {
    this.router.navigate(['login']);
  }

}
