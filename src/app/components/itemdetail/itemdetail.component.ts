import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../models/item.model';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-itemdetail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './itemdetail.component.html',
  styleUrl: './itemdetail.component.css'
})
export class ItemdetailComponent {
  item: Item | undefined;

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {                  
    this.getItemDetails();
  }

  goBackToList(): void {
    this.route.navigate(['/items']); // Перенаправляем на страницу /items/
  }

  getItemDetails(): void {
    const id = this.router.snapshot.paramMap.get('id');
    if (id) {                                       
      this.itemService.getItemById(id)
        .subscribe(
          (item) => {
            this.item = item;
            console.log('Item details:', this.item);
          },
          (error) => {
            console.error('Error fetching item details:', error);
          }
        );
    }
  }
}

