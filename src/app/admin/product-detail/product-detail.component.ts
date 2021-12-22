import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public api: ApiService
  ) {}

  ngOnInit(): void {}

  // saveData() {
  //   this.dialogRef.close(this.data);
  // }
  loading: boolean;
  saveData() {
    this.loading = true;
    //jika id tidak terdefinisi maka buat data
    if (this.data.id == undefined) {
      //prosedur pengiriman data ke server menggunakan metode POST
      this.api.post('books', this.data).subscribe(
        (result) => {
          //tutup dialog dan kirimkan feedback server ke fungsi pemanggil dialog
          this.dialogRef.close(result);
          this.loading = false;
        },
        (error) => {
          //kondisi jika terjadi masalah pengiriman pada pengiriman data
          this.loading = false;
          alert('Tidak dapat menyimpan data ' + error);
        }
      );
    } else {
      //prosedur edit data menggunakan metode PUT
      this.api.put('books/' + this.data.id, this.data).subscribe(
        (result) => {
          //tutup dialog dan kirimkan feedback server ke fungsi pemanggil dialog
          this.dialogRef.close(result);
          console.log(result);
        },
        (error) => {
          //kondisi jika terjadi masalah pengiriman pada pengiriman data
          this.loading = false;
          alert('Tidak dapat memperbaharui data ' + error);
        }
      );
    }
  }
}
