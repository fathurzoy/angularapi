import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
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

  user: any = {};
  hide: boolean = true;

  // email = new FormControl('', [Validators.required, Validators.email]);
  // password = new FormControl('', [
  //   Validators.minLength(6),
  //   Validators.required,
  // ]);

  loading: boolean;
  register() {
    this.loading = true;
    this.api.register(this.user.email, this.user.password).subscribe(
      (res) => {
        console.log(res);
        this.loading = false;
        //this.router.navigate(['login']);
      },
      (error) => {
        this.loading = false;
        alert('Ada masalah');
      }
    );
  }
}
