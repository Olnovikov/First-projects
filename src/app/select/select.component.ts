import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { GeoAnswer } from '../interfaces/geoAnswer';
import { City } from '../interfaces/sity';
import { WeatherAnswer } from '../interfaces/weatherAnswer';
import { WeatherModel } from '../interfaces/weatherModel';



@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  constructor(public http:HttpClient) {

  }
    lat:string=''
    lon:string=''
    SearchedCity:string=''
    citys:City[]=[]
    weatherModels:WeatherModel[]=[]

  getPoint(e:any){
if (e) {
  this.citys.forEach(element => {if ((element.name+' '+element.description) == e.$ngOptionLabel) {

    this.lon=element.Point.pos.split(' ',element.Point.pos.length )[0]
    this.lat=element.Point.pos.split(' ',element.Point.pos.length )[1]

    }

    });

    this.getWeather()
}

}
  search(e:any){
    this.SearchedCity=e.target.value
    if(this.SearchedCity.trim()&&this.SearchedCity.length>3){
      this.http.get<GeoAnswer>(`${environment.geoApi}?apikey=${environment.apiKeyGeo}&format=json&geocode=${this.SearchedCity}&results=3`)
      .pipe(
        map(res=>(<GeoAnswer>res).response.GeoObjectCollection.featureMember.map((res: { GeoObject:any; })=> {
          return res.GeoObject;}

        )),

      )
      .subscribe(res=>this.citys=res
        )
    }

  }

  getWeather(){
    this.http.get<WeatherAnswer>(`${environment.weatherApi}?lat=${this.lat}&lon=${this.lon}&appid=${environment.apiKeyWeather}`)
    .pipe(
      map(res=>(<WeatherAnswer>res).list)
    )
    .subscribe(res=>this.weatherModels=res)

  }


  ngOnInit(): void {



  }

}
