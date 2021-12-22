import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

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
