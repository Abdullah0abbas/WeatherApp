import { Component, OnInit } from '@angular/core';
import { WeatherData } from './models/weather.model';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})

export class AppComponent implements OnInit {
  weatherData!:WeatherData;
  lat!: number;
  lon!: number;
  dateNowForDisplay!:Date

  constructor(private weatherService:WeatherService){}
  cityName!: string;
  dayOrNight?: string;

  ngOnInit(): void {
    this.getLocation();
  }

  onSubmit(){
    this.getWeatherData(this.cityName)
    this.cityName = '';
  }

  getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition((success) => {
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;
        this.weatherService
          .getWeatherDataByCoords(this.lat, this.lon)
          .subscribe((data) => {
            this.weatherData = data;
            this.dayOrNightFunc(this.weatherData);   
            setInterval(()=>{
              this.dateNowForDisplay=new Date();
            },1000)
          });
      });
    }
  }

 

  getWeatherData(cityName:string){
    this.weatherService.getWeatherDataByCity(cityName).subscribe({
      next:(response)=>{
        this.weatherData = response;
        console.log(this.weatherData)
        this.dayOrNightFunc(this.weatherData);
      }
    })
  }

  dayOrNightFunc(weather:WeatherData){
    const sunriseDate = new Date(weather.sys.sunrise * 1000);
    const sunsetDate = new Date(weather.sys.sunset * 1000);
    const dateNow = new Date();
    if (dateNow > sunriseDate && dateNow < sunsetDate) {
      this.dayOrNight = 'day';
    } else {
      this.dayOrNight = 'night';
    }
  }

  
}
