import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: any = {};
  constructor(public api: ApiService, public router: Router) {}

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin() {
    this.api.get('bookswithauth/status').subscribe(
      (res) => {
        //  is loggged in
        this.router.navigate(['admin/dashboard']);
      },
      (err) => {
        return;
      }
    );
  }

  login() {
    // console.log(this.user);
    this.api.login(this.user.email, this.user.password).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('appToken', JSON.stringify(res));
        this.router.navigate(['admin/dashboard']);
      },
      (err) => {
        alert('tidak dapat login');
      }
    );
  }
}
