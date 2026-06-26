import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.css'
})
export class StarRatingComponent {

  @Input() rating: number = 0;          
  @Input() size: number = 24;           
  @Input() color: string = '#d84565';   
  @Input() readonly: boolean = true;    

  stars = [1, 2, 3, 4, 5];

  get roundedRating(): number {
    return Math.round(this.rating); 
  }

  setRating(value: number) {
    if (!this.readonly) {
      this.rating = value;
    }
  }
}
