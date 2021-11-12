import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GeoAnswer } from './interfaces/geoAnswer';
import { WeatherAnswer } from './interfaces/weatherAnswer';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(public http: HttpClient) {}

  SearchedCity: string = '';

  getWeather(lat: string, lon: string) {
    return this.http
      .get<WeatherAnswer>(
        `${environment.weatherApi}?lat=${lat}&lon=${lon}&appid=${environment.apiKeyWeather}`
      )
      .pipe(map((res) => (<WeatherAnswer>res).list));
  }

  getCoords(SearchedCity: any) {
    return this.http
      .get<GeoAnswer>(
        `${environment.geoApi}?apikey=${environment.apiKeyGeo}&format=json&geocode=${SearchedCity}&results=3`
      )
      .pipe(
        map((res) =>
          (<GeoAnswer>res).response.GeoObjectCollection.featureMember.map(
            (res: { GeoObject: any }) => {
              return res.GeoObject;
            }
          )
        )
      );
  }
}
