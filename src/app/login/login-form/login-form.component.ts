import { AuthService } from './../../services/auth-service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../../models/account/account.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  account = {} as Account;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() { }

  async login() {
    const result = await this.authService.signInWithEmailAndPassword(this.account);
  }

  navigateToRegisterPage() {
    this.router.navigate(['register']);
  }

}
