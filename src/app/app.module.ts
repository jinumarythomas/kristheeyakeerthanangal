import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from "@angular/http";
import { AppComponent } from './app.component';
import { SongComponent } from './song/song.component';
import { HomeComponent } from './home/home.component';
import {FilterPipe} from './song/filterPipe';
import {HighlightPipe} from './song/highlightPipe';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    SongComponent,
    HomeComponent,
    FilterPipe,
    HighlightPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgxPaginationModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: '', component: HomeComponent }
      
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
