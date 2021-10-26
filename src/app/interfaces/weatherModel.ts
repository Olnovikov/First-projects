import { weatherStatus } from "./weatherStatus";

export interface WeatherModel {
  dt_txt:string
  main:{
    temp:number
  }
  weather:weatherStatus[]
}
