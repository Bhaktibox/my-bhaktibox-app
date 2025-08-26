import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  banners: string[] = [
    'assets/images/banners/banner1.jpg',
    'assets/images/banners/banner2.jpg',
    'assets/images/banners/banner3.jpg',
  ];

  currentIndex = 0;
  selectedFile: File | null = null;
  autoSlideInterval: any;

  packages = [
    { id: 1, name: 'Griha Pravesh', description: 'Complete set for housewarming ceremony.' },
    { id: 2, name: 'Satyanarayan Puja', description: 'All essentials for Satyanarayan katha.' },
    { id: 3, name: 'Navratri Kit', description: 'All essentials for Navratri katha' },
  ];

  categorySections = [
    { id: 1,title: 'Daily Puja Samagri', items: [{ name: 'Agarbatti', image: 'assets/images/items/agarbatti.jpg' }] },
    { id: 2,title: 'Idols & Statues', items: [{ name: 'Ganesh Idol', image: 'assets/images/items/ganesh.jpg' }] },
    { id: 3,title: 'Puja Thalis & Accessories', items: [{ name: 'Puja Thali', image: 'assets/images/items/thali.jpg' }] },
    { id: 4,title: 'Flowers', items: [{ name: 'Hibiscus', image: 'assets/images/items/hibiscus.jpg' }] },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // 🔹 Start auto slide every 3 seconds
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }
  // Carousel controls
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.banners.length;
  }
  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.banners.length) % this.banners.length;
  }
  goToSlide(index: number) {
    this.currentIndex = index;
  }

  // Upload section
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  uploadFile() {
    if (this.selectedFile) {
      console.log('Uploading:', this.selectedFile.name);
      alert('File uploaded successfully!');
      this.router.navigate(['/upload'], {
        state: { fileName: this.selectedFile.name }
      });
    } else {
      alert('Please select a file first.');
    }
  }
}
