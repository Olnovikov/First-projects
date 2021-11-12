import {
  Component,
  ViewEncapsulation,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Navigation } from 'swiper';
import { WeatherModel } from '../interfaces/weatherModel';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../api.service';

SwiperCore.use([Navigation]);

@Component({
  selector: 'app-swiper',
  template: `<swiper
    (slideChange)="getActiveSlide($event)"
    *ngIf="WeatherObj"
    [navigation]="true"
    class="mySwiper"
    #swiper
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
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public apiServise: ApiService
  ) {}

  weatherModels: WeatherModel[] = [];
  WeatherObj: Record<string, WeatherModel[]> = {};

  Kelvin: number = 273.15;
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  getActiveSlide(swiper: any) {
    this.router.navigate(['/'], {
      queryParams: { activeSlide: swiper.activeIndex },
      queryParamsHandling: 'merge',
    });
  }
  getWeather(weatherModels: WeatherModel[]) {
    this.WeatherObj = {};
    weatherModels.forEach((element: WeatherModel) => {
      let date = element.dt_txt.split(' ', element.dt_txt.length)[0];
      if (!Object.keys(this.WeatherObj).includes(date)) {
        this.WeatherObj[date] = [];
      }
      this.WeatherObj[date].push(element);
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (this.swiper) {
        this.swiper.swiperRef.slideTo(params.activeSlide);
      }
      if (params.lon && params.lat && params.sityName) {
        this.apiServise.getWeather(params.lat, params.lon).subscribe((res) => {
          this.weatherModels = res;
          this.getWeather(this.weatherModels);
        });
      }
    });
  }
}
