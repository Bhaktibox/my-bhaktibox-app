import { Component, OnInit } from '@angular/core';

interface Item {
  imageUrl: string;
  title: string;
  description: string;
  basePrice: number;
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  items: Item[] = [
    {
      imageUrl: 'assets/images/diya.jpg',
      title: 'Brass Diya',
      description: 'Traditional brass diya for your daily rituals.',
      basePrice: 250
    },
    {
      imageUrl: 'assets/images/incense.jpg',
      title: 'Sandal Incense',
      description: 'Pure sandalwood incense sticks with divine aroma.',
      basePrice: 180
    },

    {
      imageUrl: 'assets/images/bell.jpg',
      title: 'Temple Bell',
      description: 'Handcrafted bell for spiritual resonance.',
      basePrice: 350
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
