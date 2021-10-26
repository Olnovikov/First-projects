import { City } from "./sity";

export interface GeoAnswer{
  response:{
    GeoObjectCollection:{
      featureMember:featureMember[]
    }
  }
}

export interface featureMember{
  GeoObject:City
}
