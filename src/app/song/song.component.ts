import { Component, OnInit, Input,  Renderer, ViewChild, HostListener, ElementRef, ViewEncapsulation, Output, EventEmitter, ViewChildren } from '@angular/core';
import { AppService} from '../app.service';
import { debug } from 'util';


@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SongComponent implements OnInit {
  term: any = '';
  name:string;
  hide:string;
  showList:boolean;
  song: any;
  showSong: boolean;
  
  @ViewChild('masthead') masthead;
  @ViewChild('searchFocus') searchFocus;
  @ViewChild('searchResult') searchResult;
  @Output() clearText = new EventEmitter();
  @Output() showSongFlag = new EventEmitter();
  @Output() songUrl = new EventEmitter();

  songs: any;
  num: any;

  constructor(private appService: AppService, private renderer: Renderer) { }

  @HostListener('window:click', ['$event'])
  keyEvent(event: KeyboardEvent,) {
    this.showList = false;
  }

  ngAfterViewInit(){
    this.renderer.invokeElementMethod(
      this.searchFocus.nativeElement,
      'focus'
    );
  }


  ngOnInit(): void {  
    this.showList = false;
    this.searchText();
    this.appService.getSongs()
        .subscribe(songs => {
            this.songs = JSON.parse(songs._body);
        })
  }

  searchText(): void {
    if(this.term.length > 0) {
      this.showList = true;
    } else {
      this.showList = false;
      this.showSong = false;
    }
  }
  
  selectedSong(s): void {
    this.term = s.title;
    this.showList = false;
    this.showSong = true;
    this.num = this.term.split("-");
    if(this.num[0].trim() == 'DOX10') { 
      this.num[0] = '329';
    } else if(this.num[0].trim() == 'DOX11') { 
      this.num[0] = '328';
    } else if(this.num[0].trim() == 'DOX12') { 
      this.num[0] = '427';
    } else if(this.num[0].trim() == 'DOX13') { 
      this.num[0] = '428';
    };
    this.getSong(this.num[0].trim());
    this.showSongFlag.emit(this.showSong);
  }
  
  clear(): void {
    this.term= '';
    this.showList = false;
    this.showSong = false;
    this.searchFocus.nativeElement.focus();
    this.showSongFlag.emit(this.showSong);
  }

  getSong(sn): void {
    this.appService.setSongNumber(sn);
    this.appService.getSong()
        .subscribe(song => {
            this.song = song;
            this.showSong = true;
            this.songUrl.emit(this.song);
        })
        
  }
}
