import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent implements OnInit {
  constructor(
    public api: ApiService,
    public dialogRef: MatDialogRef<FileUploaderComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData
  ) {}

  ngOnInit(): void {
    console.log(this.dialogData);
  }

  selectedFile: any;
  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      // if (this.selectedFile.type != 'image/png') alert('file harus png');
      console.log(this.selectedFile);
    }
  }

  loadingUpload: boolean;
  uploadFile() {
    let input = new FormData();
    input.append('file', this.selectedFile);
    this.loadingUpload = true;
    this.api.upload(input).subscribe(
      (data) => {
        this.updateProduct(data);
        console.log(data);
      },
      (error) => {
        alert('Gagal mengunggah file');
        this.loadingUpload = false;
      }
    );
  }

  updateProduct(data) {
    if (data.status == true) {
      // lakukan update data product disini
      this.updateBook(data);
      alert('File berhasil diunggah');
      this.loadingUpload = false;
      this.dialogRef.close();
    } else {
      alert(data.meesage);
      this.loadingUpload = false;
    }
  }

  updateBook(data) {
    this.api
      .put('books/' + this.dialogData.id, { url: data.url })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
