import {
  Component,
  ViewEncapsulation,
  Input,
  OnInit,
} from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Navigation } from 'swiper';
import { WeatherModel } from '../interfaces/weatherModel';
import { ActivatedRoute, Params, Router } from '@angular/router';

SwiperCore.use([Navigation]);

@Component({
  selector: 'app-swiper',

  template: `<swiper
  [initialSlide]="activeSlide"
    (slideChange)="getActiveSlide($event)"
    *ngIf="WeatherObj"
    [navigation]="true"
    class="mySwiper"
  >
    <ng-template *ngFor="let item of WeatherObj | keyvalue" swiperSlide>
      <div class="info">
        <h3 class="weathertittle">{{ item.key | date }}</h3>
        <div class="infobox">
          <p class="text" *ngFor="let WeatherModel of item.value">
            {{ WeatherModel.dt_txt | date: ' HH mm' }}<br />
            {{ WeatherModel.main.temp - Kelvin | number: '1.0-0' }}
            C°<br />
            {{ WeatherModel.weather[0].main }}
            <app-icon [icon]="WeatherModel.weather[0].main"></app-icon>
          </p>
        </div>
      </div>
    </ng-template>
  </swiper>`,
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SliderComponent implements OnInit {
  constructor(public router: Router, public route: ActivatedRoute) {}
  activeSlide?:number
  Kelvin: number = 273.15;
  getActiveSlide(swiper: any) {
    this.router.navigate(['/'], {
      queryParams: { activeSlide: swiper.activeIndex },
      queryParamsHandling: 'merge',
    });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.activeSlide = params.activeSlide;


    });
  }

  @Input() WeatherObj: Record<string, WeatherModel[]> = {};
}
