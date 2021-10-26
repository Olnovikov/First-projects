import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppComponent } from './app.component';
import { SelectComponent } from './select/select.component';
import {HttpClientModule} from '@angular/common/http';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { SwiperModule } from 'swiper/angular';
import { SliderComponent } from './slider/slider.component';



@NgModule({
  declarations: [
    AppComponent,
    SelectComponent,
    SliderComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule,
    NgOptionHighlightModule,
    SwiperModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
