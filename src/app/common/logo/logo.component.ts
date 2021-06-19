import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'splaxh-logo',
  template: `<a [routerLink]="['/']">
              <span>
                  <mat-icon>subscriptions </mat-icon>
                  SplaxH
              </span>
            </a>
            `,
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
