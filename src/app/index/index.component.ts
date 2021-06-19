import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-index',
  template: `<div fxLayout="column" fxFlexFill>
               <splaxh-nav [deviceXs]="deviceXs"></splaxh-nav>
               <router-outlet></router-outlet>
               <splaxh-footer></splaxh-footer>
              </div>
            `
})
export class IndexComponent implements OnInit {

  subscriptions: Subscription[] = [];
  deviceXs: boolean;

  constructor(private mediaObserver: MediaObserver) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.mediaObserver.media$.subscribe((media: MediaChange) => {
        
        this.deviceXs = media.mqAlias === 'xs' ? true : false;
      })
    )
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
