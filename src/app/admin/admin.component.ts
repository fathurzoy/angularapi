import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(public api: ApiService, public router: Router) {}

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin() {
    this.api.get('bookswithauth/status').subscribe(
      (res) => {
        //  is loggged in
        return;
      },
      (err) => {
        this.router.navigate(['login']);
      }
    );
  }

  logout() {
    let conf = confirm('Keluar aplikasi?');
    if (conf) {
      localStorage.removeItem('appToken');
      window.location.reload();
    }
  }

  menu = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
      url: '/admin/dashboard',
    },
    {
      group: 'Menu Group',
      children: [
        {
          name: 'Product',
          icon: 'camera_enchance',
          url: '/admin/product',
        },
        {
          name: 'Image Gallery',
          icon: 'images',
          url: '/admin/gallery',
        },
      ],
    },
  ];
}
