import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent implements OnInit {
  items: any[] = [];

  constructor(private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.http.get<any[]>('http://127.0.0.1:8000/items') // Замените 'http://your-go-server-url/items' на ваш реальный URL
      .subscribe(
        (response) => {
          this.items = response;
          console.log('Items:', this.items);
        },
        (error) => {
          console.error('Error fetching items:', error);
        }
      );
  }

  goToVideo(itemsid: string): void {
    // Перенаправляем на другой компонент (допустим, VideoComponent) с передачей URL
    this.router.navigateByUrl(`/items/${itemsid}`);
  }
  goUpload(): void {
    this.router.navigate(['/upload']);
  }
}
