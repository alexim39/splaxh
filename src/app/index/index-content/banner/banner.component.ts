import { Component, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngbmodule/material-carousel';


@Component({
  selector: 'splaxh-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  //auto = '50vh'

  slides = [
    {
      image: './../../../../assets/img/b1.jpg'
    },
    /* {
      image: './../../../../assets/img/banner2.jpg'
    }, */
    {
      image: './../../../../assets/img/b2.jpg'
    },
    {
      image: './../../../../assets/img/b3.jpg'
    },
    {
      image: './../../../../assets/img/b4.jpg'
    }
  ]

  constructor() {
   
   }

  ngOnInit(): void {
  }

}
