import { HttpClient } from '@angular/common/http';
import { Component, Output, OnInit, Input,OnDestroy} from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EventEmitter } from '@angular/core';
import { GeoAnswer } from '../interfaces/geoAnswer';
import { City } from '../interfaces/sity';
import { WeatherAnswer } from '../interfaces/weatherAnswer';
import { WeatherModel } from '../interfaces/weatherModel';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  constructor(
    public http: HttpClient,
    public router: Router,
    public route: ActivatedRoute
  ) {}
  sityName: string = '';
  lat: string = '';
  lon: string = '';
  SearchedCity: string = '';
  citys: City[] = [];
  weatherModels: WeatherModel[] = [];
  @Output() weather: EventEmitter<WeatherModel[]> = new EventEmitter();

  getPoint(e: any) {
    if (e) {
      this.sityName=e.$ngOptionLabel
      const city = this.citys.find((element) => element.name + ' ' + element.description == e.$ngOptionLabel) as City;

        if (city) {
          this.lon = city.Point.pos.split(' ', city.Point.pos.length)[0];
          this.lat = city.Point.pos.split(' ', city.Point.pos.length)[1];

        }

      this.setQueryParams()
    }
  }
  setQueryParams(){
    this.router.navigate([`/`], {
    queryParams: {
      lat: this.lat,
      lon: this.lon,
      sityName: this.sityName,

    },

  })
}
  search(e: any) {
    this.SearchedCity = e.target.value;
    if (this.SearchedCity.trim() && this.SearchedCity.length > 3) {
      this.http
        .get<GeoAnswer>(
          `${environment.geoApi}?apikey=${environment.apiKeyGeo}&format=json&geocode=${this.SearchedCity}&results=3`
        )
        .pipe(
          map((res) =>
            (<GeoAnswer>res).response.GeoObjectCollection.featureMember.map(
              (res: { GeoObject: any }) => {
                return res.GeoObject;
              }
            )
          )
        )
        .subscribe((res) => (this.citys = res));
    }
  }

  getWeather() {
    this.http
      .get<WeatherAnswer>(
        `${environment.weatherApi}?lat=${this.lat}&lon=${this.lon}&appid=${environment.apiKeyWeather}`
      )
      .pipe(map((res) => (<WeatherAnswer>res).list))
      .subscribe((res) => {
        this.weatherModels = res;
        this.weather.emit(this.weatherModels);
      });
  }



  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.lon = params.lon;
      this.lat = params.lat;
      this.sityName = params.sityName;
      if (params.lon && params.lat && params.sityName) {
        this.getWeather();
      }
    });
  }

}
