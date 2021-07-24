import { AfterViewInit, Component, Input, ViewChild, OnInit, ElementRef } from "@angular/core";
// declare jquery as any
declare const $: any;


@Component({
  selector: 'splaxh-typing',
  templateUrl: './typing.component.html',
  styleUrls: ['./typing.component.scss', './typing.mobile.scss']
})
export class TypingComponent implements OnInit, AfterViewInit {

  @ViewChild("textElement") textElement: ElementRef;
  @ViewChild("blinkElement") blinkElement: ElementRef;
  @Input() wordArray: string[] = [
    " you get the opportunity to get connected to superstars in Nigeria.    ",
    " you upload your music to get selected for a life time deal.     ",
    //" Get help with accademic work from fellow students.     ",
    //" Get links to helpful  academic resources.     ",
    //" Get links to income generating resources.     ",
    //" Give help with accademic work to fellow students.     ",
  ];

  private i = 0;

  constructor() { }

  ngOnInit(): void {
  }

 

  ngAfterViewInit(): void {
    this.typingEffect();
  }

  private typingEffect(): void {
    const word = this.wordArray[this.i].split("");
    const loopTyping = () => {
      if (word.length > 0) {
        this.textElement.nativeElement.innerHTML += word.shift();
      } else {
        this.deletingEffect();
        return;
      }
      setTimeout(loopTyping, 300);
    };
    loopTyping();
  }

  private deletingEffect(): void {
    const word = this.wordArray[this.i].split("");
    const loopDeleting = () => {
      if (word.length > 0) {
        word.pop();
        this.textElement.nativeElement.innerHTML = word.join("");
      } else {
        if (this.wordArray.length > this.i + 1) {
          this.i++;
        } else {
          this.i = 0;
        }
        this.typingEffect();
        return;
      }
      setTimeout(loopDeleting, 100);
    };
    loopDeleting();
  }





}
