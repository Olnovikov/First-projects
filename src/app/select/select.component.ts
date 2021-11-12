import { Component, Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { City } from '../interfaces/sity';
import { WeatherModel } from '../interfaces/weatherModel';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Debounce } from 'lodash-decorators';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public apiService: ApiService
  ) {}
  SearchedCity: string = '';
  sityName: string = '';
  lat: string = '';
  lon: string = '';
  citys: City[] = [];
  weatherModels: WeatherModel[] = [];
  @Output() weather: EventEmitter<WeatherModel[]> = new EventEmitter();

  getPoint(e: any) {
    if (e) {
      this.sityName = e.$ngOptionLabel;
      const city = this.citys.find(
        (element) =>
          element.name + ' ' + element.description == e.$ngOptionLabel
      ) as City;

      if (city) {
        this.lon = city.Point.pos.split(' ', city.Point.pos.length)[0];
        this.lat = city.Point.pos.split(' ', city.Point.pos.length)[1];
      }

      this.setQueryParams();
    }
  }
  setQueryParams() {
    this.router.navigate([`/`], {
      queryParams: {
        lat: this.lat,
        lon: this.lon,
        sityName: this.sityName,
      },
    });
  }
@Debounce(300)
  search(e: any) {
    this.SearchedCity = e.target.value
    if (this.SearchedCity.trim() && this.SearchedCity.length >= 3) {
      let SityStream = this.apiService.getCoords(this.SearchedCity);
      if (SityStream) {
        SityStream.subscribe((res) => (this.citys = res));
      }
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.lon = params.lon;
      this.lat = params.lat;
      this.sityName = params.sityName;
      if (params.lon && params.lat && params.sityName) {
        let WeatherStream = this.apiService.getWeather(this.lat, this.lon);
        WeatherStream.subscribe((res) => {
          this.weatherModels = res;
          this.weather.emit(this.weatherModels);
        });
      }
    });
  }
}
