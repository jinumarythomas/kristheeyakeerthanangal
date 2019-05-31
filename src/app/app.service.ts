import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

@Injectable()
export class AppService {
  songNumber: number;
  songFile: string;
  songUrl: string;
  songs: string;

  constructor(private _http: Http) {}

  getSong(): Observable<any> {
    this.songFile = this.songNumber + ".png";
    this.songUrl = "./assets/songs/" + this.songFile;
    return this._http.get(this.songUrl);
  }

  getSongs(): Observable<any> {
    return this._http.get("./assets/api/songs.json");
  }

  contactusSubmit(url): Observable<any> {
      return this._http.get(url);
  }

  setSongNumber(sn) {
    this.songNumber = sn;
  }
}
