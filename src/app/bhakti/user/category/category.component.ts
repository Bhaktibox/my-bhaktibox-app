import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  categoryId: number;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryId!: number;
  categoryName = '';
  searchTerm = '';
  items: Product[] = [];
  allProducts: Product[] = [
    // ✅ Sample data (later replace with API call)
    { id: 1, name: 'Ganesh Idol', price: 500, image: 'assets/ganesh.jpg', quantity: 1, categoryId: 1 },
    { id: 2, name: 'Lakshmi Idol', price: 700, image: 'assets/lakshmi.jpg', quantity: 1, categoryId: 1 },
    { id: 3, name: 'Durga Idol', price: 650, image: 'assets/durga.jpg', quantity: 1, categoryId: 1 },
    { id: 4, name: 'Puja Thali Set', price: 350, image: 'assets/thali.jpg', quantity: 1, categoryId: 2 },
    { id: 5, name: 'Copper Kalash', price: 450, image: 'assets/kalash.jpg', quantity: 1, categoryId: 2 },
    { id: 6, name: 'Incense Sticks', price: 120, image: 'assets/incense.jpg', quantity: 1, categoryId: 3 },
    { id: 7, name: 'Clay Diyas (Pack of 10)', price: 80, image: 'assets/diya.jpg', quantity: 1, categoryId: 3 }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCategoryItems();
  }

  // Load products for selected category
  loadCategoryItems() {
    this.items = this.allProducts.filter(p => p.categoryId === this.categoryId);

    // Set category name based on id
    if (this.categoryId === 1) this.categoryName = 'Idols & Statues';
    else if (this.categoryId === 2) this.categoryName = 'Puja Thali';
    else if (this.categoryId === 3) this.categoryName = 'Incense & Diyas';
    else this.categoryName = 'Category';
  }

  // 🔍 Search filter
  filteredItems() {
    return this.items.filter(item =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  increaseQuantity(item: Product) {
    item.quantity++;
  }

  decreaseQuantity(item: Product) {
    if (item.quantity > 1) item.quantity--;
  }

  addToCart(item: Product) {
    alert(`${item.name} (${item.quantity}) added to cart!`);
    // TODO: connect to cart service
  }
}
