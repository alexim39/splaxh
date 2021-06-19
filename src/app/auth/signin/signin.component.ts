import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'splaxh-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  hide = true; // password hide

  constructor() { }

  ngOnInit(): void {
  }

}
