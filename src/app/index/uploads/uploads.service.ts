import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { ServerResponse } from './../../common/server/response.interface';
import { environment } from 'src/environments/environment';


export interface AudioInterface {
  userId: string;
  stageName: string;
  trackTitle: string;
  trackCategory: string;
  description: string;
  file: File;
}

export interface VideoInterface {
    userId: string;
    stageName: string;
    vedioTitle: string;
    videoCategory: string;
    description: string;
    youtubeURL: string
    
}

const httpAdudioOptions = {
  withCredentials: true,
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data'
  })
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
export class UploadsService {
  private API_DOMAIN: string = environment.API_DOMAIN;

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occured. Handle accordingly
      // console.error('An error occured:', error.error.message);
      return throwError(`Request failed due to network error, please try again`);
    } else {
      // Backend returned an unsuccessful response code.
      // The repsonse body contains clues as to what went wrong
      // console.error(`Backend error code: ${error.status}, backend message: ${error.error}`);
      return throwError(error);
    }
    // Return an observable with user-facing error msg
    // return throwError(`Something went wrong, please try again.`)
  }


  audioUpload(audioObj: AudioInterface): Observable<ServerResponse> {
    console.log(audioObj)
    return this.http.post<ServerResponse>(`${this.API_DOMAIN}/api/upload/audio`, audioObj, httpOptions)
      .pipe(
        retry(2), // retry a failed request up to 2 times
        catchError(this.handleError)
      );
  }

  vidoeUpload(videoObj: VideoInterface): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(`${this.API_DOMAIN}/api/upload/video`, videoObj, httpOptions)
      .pipe(
        retry(2), // retry a failed request up to 2 times
        catchError(this.handleError)
      );
  }

}