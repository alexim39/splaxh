import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

export interface UserInterface {
    // members
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    isActive: boolean;
}

const httpOptions = {
    withCredentials: true,
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
}

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private dataSource = new BehaviorSubject<UserInterface>(null);
    public currentUser = this.dataSource.asObservable();

    constructor() { }

    public setUser(user: UserInterface): void {
        //console.log(user)
        this.dataSource.next(user);
    }
  
}
