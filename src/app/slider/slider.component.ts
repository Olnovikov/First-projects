import { Component, ViewEncapsulation, Input } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';

import SwiperCore, { Navigation } from 'swiper';
import { WeatherModel } from '../interfaces/weatherModel';

SwiperCore.use([Navigation]);

@Component({
  selector: 'app-swiper',
  template: `<swiper
    *ngIf="weatherS1.length"
    [navigation]="true"
    class="mySwiper"
  >
    <ng-template swiperSlide>
      <div class="info">
        <h3 class="weathertittle">{{ weatherS1[0].dt_txt | date }}</h3>
        <div class="infobox">
          <p class="text" *ngFor="let WeatherModel of weatherS1">
            {{ WeatherModel.dt_txt | date:' HH mm' }}<br />{{
             (WeatherModel.main.temp-Kelvin)|number:'1.0-0'
            }} C°<br>
            {{WeatherModel.weather[0].main}}
            <app-icon [icon]='WeatherModel.weather[0].main'></app-icon>
          </p>

        </div>
      </div> </ng-template
    ><ng-template swiperSlide>Slide 2</ng-template
    ><ng-template swiperSlide>Slide 3</ng-template
    ><ng-template swiperSlide>Slide 4</ng-template>
    <ng-template swiperSlide>Slide 5</ng-template>
    <ng-template swiperSlide>Slide 6</ng-template>
  </swiper>`,
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SliderComponent {
  @Input() weatherS1: WeatherModel[] = [];
  @Input() weatherS2: WeatherModel[] = [];
  @Input() weatherS3: WeatherModel[] = [];
  @Input() weatherS4: WeatherModel[] = [];
  @Input() weatherS5: WeatherModel[] = [];
  @Input() weatherS6: WeatherModel[] = [];
  Kelvin:number=273.15


}
