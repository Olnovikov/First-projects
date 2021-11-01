import { Component, ViewEncapsulation, Input } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Navigation } from 'swiper';
import { WeatherModel } from '../interfaces/weatherModel';


SwiperCore.use([Navigation]);

@Component({
  selector: 'app-swiper',
  template: `<swiper
    *ngIf="WeatherObj"
    [navigation]="true"
    class="mySwiper"

  >
    <ng-template    *ngFor="let item of WeatherObj| keyvalue" swiperSlide>
      <div class="info">
        <h3 class="weathertittle">{{ item.key| date }}</h3>
        <div class="infobox">
          <p class="text" *ngFor="let WeatherModel of item.value">
            {{ WeatherModel.dt_txt | date: ' HH mm' }}<br />
            {{
              WeatherModel.main.temp - Kelvin | number: '1.0-0'
            }}
            C°<br />
            {{ WeatherModel.weather[0].main }}
            <app-icon [icon]="WeatherModel.weather[0].main"></app-icon>
          </p>
        </div>
      </div> </ng-template
    >
  </swiper>`,
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SliderComponent {
  @Input() WeatherObj: Record<string, WeatherModel[]> = {};

  Kelvin: number = 273.15;
}
