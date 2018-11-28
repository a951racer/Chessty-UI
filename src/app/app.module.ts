import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule, RequestOptions } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { customHttpProvider } from '../assets/custom-http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
  ],
  providers: [
    customHttpProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
