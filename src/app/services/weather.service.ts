import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherData } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiURL = 'https://api.openweathermap.org/data/2.5/weather';
  apiKEY = 'ea41fac6b720035cc9f8975b8c1d761a'
  constructor(private http: HttpClient) { }

  getWeatherDataByCoords(lat:number, lon:number): Observable<WeatherData> {
    let params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('appid', this.apiKEY)
      .set('units', 'metric');
      

    return this.http.get<WeatherData>(this.apiURL, { params });
  }


  getWeatherDataByCity(city:string): Observable<WeatherData> {
    let params = new HttpParams()
      .set('q',city)
      .set('appid', this.apiKEY)
      .set('units', 'metric');
      

    return this.http.get<WeatherData>(this.apiURL,{ params });
  }
}
