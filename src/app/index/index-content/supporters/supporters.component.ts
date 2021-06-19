import { Component, OnInit } from '@angular/core';
// declare jquery as any
declare const $: any;

@Component({
  selector: 'splaxh-supporters',
  templateUrl: './supporters.component.html',
  styleUrls: ['./supporters.component.scss']
})
export class SupportersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    

    $(() => {
       const $clientcarousel = $('#clients-list');
       const clients = $clientcarousel.children().length;
       const clientwidth = (clients * 220); // 140px width for each client item 
       $clientcarousel.css('width',clientwidth);
       
       let rotating = true;
       const clientspeed = 0;
       setInterval(rotateClients, clientspeed);
       
       $(document).on({
         mouseenter: () => {
           rotating = false; // turn off rotation when hovering
         },
         mouseleave: () =>   {
           rotating = true;
         }
       }, '#clients');
       
       function rotateClients() {
         if(rotating != false) {
           const $first = $('#clients-list li:first');
           $first.animate({ 'margin-left': '-220px' }, 2000, () => {
             $first.remove().css({ 'margin-left': '0px' });
             $('#clients-list li:last').after($first);
           });
         }
       }
     });
     

  }

}
