import { Component, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngbmodule/material-carousel';


@Component({
  selector: 'splaxh-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  slides = [
    {
      image: './../../../../assets/img/banner1.jpg'
    },
    /* {
      image: './../../../../assets/img/banner2.jpg'
    }, */
    {
      image: './../../../../assets/img/banner3.jpg'
    },
    {
      image: './../../../../assets/img/banner4.jpg'
    },
    {
      image: './../../../../assets/img/banner.jpg'
    }
  ]

  constructor() {
   
   }

  ngOnInit(): void {
  }

}
