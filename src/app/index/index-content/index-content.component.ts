import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'splaxh-index-content',
  template: `
    <!-- <splaxh-banner></splaxh-banner>
    <splaxh-typing></splaxh-typing> -->
    <!-- <splaxh-countdown></splaxh-countdown>
    <splaxh-supporters></splaxh-supporters> -->
    <video autoplay muted loop>
      <source src="./../../../assets/vid/slp.mp4" type="video/mp4">
      Your browser does not support HTML5 video.
    </video>
    <splaxh-typing></splaxh-typing> 
  `,
  styles: [`
    video {
      position: fixed;
      right: 0;
      bottom: 0;
      min-width: 100%; 
      min-height: 100%;
      background: rgba(0, 0, 0, 0.9);
    }
    @media only screen and (max-width:800px) {
      /* For tablets: */
      video {
        min-height: 100%;
        top: 60px;
      }
    }
  `]
})
export class IndexContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
