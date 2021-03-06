import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  title: any;
  book: any = {};
  books: any = [];
  constructor(public dialog: MatDialog, public api: ApiService) {}

  ngOnInit(): void {
    this.title = 'Product';
    this.book = {
      title: 'Angular untuk Pemula',
      author: 'Fathur Rahman Fauzan',
      publisher: 'Sunhouse Digital',
      year: 2020,
      isbn: '82973774747',
      price: 70000,
    };
    this.getBooks();
  }

  loading: boolean;
  getBooks() {
    this.loading = true;
    this.api.get('bookswithauth').subscribe(
      (result) => {
        this.books = result;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        alert('Ada masalah saat pengambilan data. Coba lagi!');
      }
    );
    // this.loading = true;
    // this.api.get('books').subscribe(
    //   (result) => {
    //     this.books = result;
    //     this.loading = false;
    //   },
    //   (error) => {
    //     this.loading = false;
    //     alert('Ada masalah saat pengambilan data. Coba lagi!');
    //   }
    // );
    // this.books = [
    //   {
    //     title: 'Angular untuk Pemula',
    //     author: 'Fathur Rahman Fauzan',
    //     publisher: 'Sunhouse Digital',
    //     year: 2020,
    //     isbn: '82973774747',
    //     price: 70000,
    //   },
    //   {
    //     title: 'Membuat Aplikasi Maps menggunakan Angular',
    //     author: 'Fathur Fauzan',
    //     publisher: 'Sunhouse Digital',
    //     year: 2020,
    //     isbn: '82924244747',
    //     price: 75000,
    //   },
    // ];
  }

  productDetail(data, idx) {
    let dialog = this.dialog.open(ProductDetailComponent, {
      width: '400px',
      data: data,
    });
    dialog.afterClosed().subscribe((res) => {
      if (res) {
        //jika idx=-1 (penambahan data baru) maka tambahkan data
        if (idx == -1) this.books.push(res);
        //jika tidak maka perbarui data
        else this.books[idx] = data;
      }
    });
  }

  //local delete
  // deleteProduct(idx) {
  //   var conf = confirm('Delete item?');
  //   if (conf) this.books.splice(idx, 1);
  // }

  loadingDelete: any = {};
  deleteProduct(id, idx) {
    var conf = confirm('Delete item?');
    this.loadingDelete[idx] = true;
    if (conf) {
      this.api.delete('books/' + id).subscribe(
        (result) => {
          this.books.splice(idx, 1);
          this.loadingDelete[idx] = false;
        },
        (error) => {
          this.loadingDelete[idx] = false;
          alert('Tidak dapat menghapus data');
        }
      );
    }
  }

  uploadFile(data) {
    let dialog = this.dialog.open(FileUploaderComponent, {
      width: '400px',
      data: data,
    });
    dialog.afterClosed().subscribe((res) => {
      return;
    });
  }

  downloadFile(data) {
    window.open('http://api.sunhouse.co.id/bookstore/' + data.url);
    // FileSaver.saveAs('http://api.sunhouse.co.id/bookstore/' + data.url);
  }
}
