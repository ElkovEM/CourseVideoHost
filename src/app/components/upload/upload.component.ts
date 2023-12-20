import { Component } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  constructor(private uploadService: UploadService,
    private route: Router) {}
  filename: string = '';
  onUpload(fileInput: any) {
    const file = fileInput.files[0];
    if (file) {
      this.uploadService.uploadFile(file, this.filename)
        .subscribe(
          (response) => {
            console.log('File uploaded successfully:', response);
          },
          (error) => {
            console.error('Error uploading file:', error);
          }
        );
    } else {
      console.error('Please select a file to upload');
    }
  }
  goBackToList(): void {
    this.route.navigate(['/items']); // Перенаправляем на страницу /items/
  }
}
