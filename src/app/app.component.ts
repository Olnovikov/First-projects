import { Component } from '@angular/core';
import { WeatherModel } from './interfaces/weatherModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  SliderObj: Record<string, WeatherModel[]> = {};
  Slide:number=0
  title = 'weather';

  getWeather(weatherModels: WeatherModel[]) {
    this.SliderObj = {};
    weatherModels.forEach((element: WeatherModel) => {
      let date = element.dt_txt.split(' ', element.dt_txt.length)[0];
      if (!Object.keys(this.SliderObj).includes(date)) {
        this.SliderObj[date] = [];
      }
      this.SliderObj[date].push(element);
    });

  }

  getSlide(currentSlide:number){
    this.Slide=currentSlide
   }


}
