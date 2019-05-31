import { Component, OnInit, Renderer, ViewChild, ViewEncapsulation } from "@angular/core";
import { debug } from "util";
import { NgForm } from "@angular/forms";
import { AppService } from "../app.service";

@Component({
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  @ViewChild("songComponent") songComponent;
  showSong: any;
  song: any;
  submitted: boolean = false;
  thanks: boolean;
  songs: any;


  constructor(private renderer: Renderer, private appService: AppService) {}

  ngOnInit() {
    this.appService.getSongs()
    .subscribe(songs => {
        this.songs = JSON.parse(songs._body);
    })
  }

  showSongFlag(showFlag) {
    this.showSong = showFlag;
  }

  songUrl(songUrl) {
    this.song = songUrl.url;
  }

  selectedSong(song){
    this.songComponent.selectedSong(song);
    window.scrollTo(0, 20);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      let googleDocsUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfGvQgTCidA9DYLf84VkpOHcKMyzJCwRPraN90ZVtoD7F9rYg/formResponse?";
      let name = form.value.name;
      let email = form.value.email;
      let comment = form.value.comment;
      let URL = googleDocsUrl + "entry.2005620554=" + name + "&entry.1045781291=" + email + "&entry.839337160=" + comment;
      this.appService.contactusSubmit(URL).subscribe();
      this.submitted = true;
      this.thanks = true;
    }
  }
}
