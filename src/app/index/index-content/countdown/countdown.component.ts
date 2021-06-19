import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'splaxh-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  // init countdown
  public morningCountdown: string;

  constructor() { }

  ngOnInit(): void {
    this.getCountDown();
  }

  private getCountDown() {

    const now = new Date();
    // Add two weeks
    //now.setDate(now.getDate() + 14);

      // Set the date we're counting down to
      const countDownDate: number = now.setDate(now.getDate() + 14);

      // Update the count down every 1 second
      const x = setInterval(() => {

        // Get today's date and time
        const now = new Date().getTime();

        // Find the distance between now and the count down date
        const distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        this.morningCountdown = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';

        // If the count down is finished, write some text
        if (distance < 0) {
          clearInterval(x);
          this.morningCountdown = 'ALREADY EXPIRED';
        }
      }, 1000);
  }

}
