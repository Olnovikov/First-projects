import { Component } from '@angular/core';
import { WeatherModel } from './interfaces/weatherModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  weatherApp1: WeatherModel[] = [];
  weatherApp2: WeatherModel[] = [];
  weatherApp3: WeatherModel[] = [];
  weatherApp4: WeatherModel[] = [];
  weatherApp5: WeatherModel[] = [];
  weatherApp6: WeatherModel[] = [];
  curDate = new Date().getDate();
  delCounter: number = 0;
  title = 'weather';
  getWeather(weatherModels: WeatherModel[]) {
    this.weatherApp1=[]
    weatherModels.forEach((element) => {
      let weatherDate = element.dt_txt.split(' ', element.dt_txt.length)[0];
      let weatherDay = weatherDate.split('-', weatherDate.length)[2];
      if (+weatherDay == this.curDate) {
        this.weatherApp1.push(element);
        this.delCounter = this.weatherApp1.length ;
      }
    });

    this.weatherApp2 = weatherModels.slice(
      this.delCounter,
      this.delCounter + 8
    );
    this.weatherApp3 = weatherModels.slice(
      this.delCounter + 8,
      this.delCounter + 16
    );
    this.weatherApp4 = weatherModels.slice(
      this.delCounter + 16,
      this.delCounter + 24
    );
    this.weatherApp5 = weatherModels.slice(
      this.delCounter + 24,
      this.delCounter + 32
    );
    this.weatherApp6 = weatherModels.slice(
      this.delCounter + 32,
      weatherModels.length
    );
    console.log(
      this.weatherApp1,
      this.weatherApp2,
      this.weatherApp3,
      this.weatherApp4,
      this.weatherApp5,
      this.weatherApp6
    );
  }
}
