import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { Account } from '../../models/account/account.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  account = {} as Account;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() { }

  async register() {
    const result = await this.authService.signUpWithEmailAndPassword(this.account);
    console.log(result);
  }

  navigateToLoginPage() {
    this.router.navigate(['login']);
  }

}
