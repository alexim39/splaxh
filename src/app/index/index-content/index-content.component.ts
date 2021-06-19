import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'splaxh-index-content',
  template: `
    <splaxh-banner></splaxh-banner>
    <splaxh-typing></splaxh-typing>
    <splaxh-countdown></splaxh-countdown>
    <splaxh-supporters></splaxh-supporters>
  `
})
export class IndexContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
