import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';


export interface UserInterface {
    // members
    _id: string;
    name: string;
    //lastname: string;
    email: string;
    isActive: boolean;
}


@Injectable({
    providedIn: 'root'
})
export class UserService {

    reload = new EventEmitter(); 
    subsVar: Subscription; 

    constructor() { }

    currentUser() {
        return localStorage.getItem('susr')
    }

    // Used to refresh deposit account balance
  reloadNavbar() {    
    this.reload.emit();    
  }  
  
}
