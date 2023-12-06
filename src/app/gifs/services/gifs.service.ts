import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gif, SearchResponse, Type } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string [] = [];
  private apiKey: string = 'XMecE1M2RkU3tLB7t24xHjcesEklrKXj';


  constructor(private http: HttpClient) { }


  get tagsHitory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag)
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);

  }

  searchTag (tag: string): void {
    if(tag.length === 0) return;

    this.organizeHistory(tag);

    this.http.get<SearchResponse>('https://api.giphy.com/v1/gifs/search?api_key=XMecE1M2RkU3tLB7t24xHjcesEklrKXj&q=valorant&limit=10')
    .subscribe( resp => {
        this.gifList = resp.data;
        //console.log({gifs: this.gifList});

    })

  }



}
