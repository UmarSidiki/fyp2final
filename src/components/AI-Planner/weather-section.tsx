/* eslint-disable react/no-array-index-key */
'use client';

import type React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import axios from 'axios';
import { Cloud, CloudRain, Sun, Thermometer, Wind } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function WeatherSection() {
  const [location, setLocation] = useState('Islamabad');
  const [weatherData, setWeatherData] = useState<any>({
    location: 'Islamabad, Pakistan',
    current: {
      temp: 30,
      condition: 'Sunny',
      humidity: 60,
      wind: 10,
    },
    forecast: [
      { day: 'Mon', temp: 30, condition: 'sunny' },
      { day: 'Tue', temp: 32, condition: 'cloudy' },
      { day: 'Wed', temp: 28, condition: 'rainy' },
      { day: 'Thu', temp: 29, condition: 'cloudy' },
      { day: 'Fri', temp: 30, condition: 'sunny' },
    ],
    hourly: [],
  });
  const getWeatherIcon = (condition: string) => {
    const lower = condition.toLowerCase();

    if (lower.includes('cloud')) {
      return <Cloud className="h-6 w-6 text-gray-500" />;
    } else if (lower.includes('rain')) {
      return <CloudRain className="h-6 w-6 text-blue-500" />;
    } else if (lower.includes('clear') || lower.includes('sun')) {
      return <Sun className="h-6 w-6 text-yellow-500" />;
    } else if (lower.includes('snow')) {
      return <CloudRain className="h-6 w-6 text-white" />; // Change to SnowIcon if you add one
    } else if (lower.includes('storm') || lower.includes('thunder')) {
      return <CloudRain className="h-6 w-6 text-purple-500" />;
    } else {
      return <Sun className="h-6 w-6 text-yellow-500" />;
    }
  };

  // const getWeatherIcon = (condition: string) => {
  //   switch (condition.toLowerCase()) {
  //     case 'sunny':
  //       return <Sun className="h-6 w-6 text-yellow-500" />;
  //     case 'cloudy':
  //       return <Cloud className="h-6 w-6 text-gray-500" />;
  //     case 'rainy':
  //       return <CloudRain className="h-6 w-6 text-blue-500" />;
  //     default:
  //       return <Sun className="h-6 w-6 text-yellow-500" />;
  //   }
  // };

  // Fetch weather data from OpenWeather API
  const fetchWeatherData = async (city: string) => {
    try {
      const apiKey = 'd8fbe136022639ef34ba986502a8192b';
      const [currentRes, forecastRes] = await Promise.all([
        axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
          params: { q: city, units: 'metric', appid: apiKey },
        }),
        axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
          params: { q: city, units: 'metric', appid: apiKey },
        }),
      ]);

      const current = currentRes.data;
      const forecastList = forecastRes.data.list;

      // Extract 5 daily forecasts (same time each day)
      const dailyForecast = forecastList.filter((item: any) =>
        item.dt_txt.includes('12:00:00'), // pick midday forecast
      ).slice(0, 5);

      // Extract hourly forecast (next 6 entries = ~18 hours)
      const hourlyForecast = forecastList.slice(0, 6);

      setWeatherData({
        location: city,
        current: {
          temp: current.main.temp,
          condition: current.weather[0].main,
          humidity: current.main.humidity,
          wind: current.wind.speed,
        },
        forecast: dailyForecast.map((item: any) => ({
          day: new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'short' }),
          temp: Math.round(item.main.temp),
          condition: item.weather[0].main.toLowerCase(),
        })),
        hourly: hourlyForecast.map((item: any) => ({
          time: new Date(item.dt_txt).toLocaleTimeString('en-US', { hour: 'numeric' }),
          temp: Math.round(item.main.temp),
          condition: item.weather[0].main.toLowerCase(),
        })),
      });
    } catch (error) {
      console.error('Weather fetch failed:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      fetchWeatherData(location);
      setLocation('');
    }
  };

  useEffect(() => {
    fetchWeatherData('Islamabad'); // Default data for Islamabad
  }, []);

  return (
    <Card className="h-[500px]">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Cloud className="h-5 w-5 text-green-600 dark:text-green-400" />
          <CardTitle>Weather Prediction</CardTitle>
        </div>
        <CardDescription>Check current weather and forecast for your destination</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <Input
            placeholder="Enter location..."
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">Search</Button>
        </form>

        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold">{weatherData.location}</h3>
          <div className="flex justify-center items-center mt-2">
            {getWeatherIcon(weatherData.current.condition)}
            <span className="text-4xl ml-2">
              {weatherData.current.temp}
              °C
            </span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{weatherData.current.condition}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <Thermometer className="h-5 w-5 mr-2 text-red-500" />
            <span>
              Humidity:
              {' '}
              {weatherData.current.humidity}
              %
            </span>
          </div>
          <div className="flex items-center">
            <Wind className="h-5 w-5 mr-2 text-green-500" />
            <span>
              Wind:
              {' '}
              {weatherData.current.wind}
              {' '}
              km/h
            </span>
          </div>
        </div>

        <Tabs defaultValue="forecast">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="forecast">5-Day Forecast</TabsTrigger>
            <TabsTrigger value="hourly">Hourly</TabsTrigger>
          </TabsList>
          <TabsContent value="forecast">
            <div className="flex justify-between mt-4">
              {/* This is just a placeholder for the forecast data */}
              {weatherData.forecast.map((day: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="font-medium">{day.day}</div>
                  <div className="my-1">{getWeatherIcon(day.condition)}</div>
                  <div>
                    {day.temp}
                    °
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="hourly">
            <div className="flex justify-between mt-4 overflow-x-auto gap-4">
              {weatherData.hourly.map((hour: any, index: number) => (
                <div key={index} className="text-center min-w-[60px]">
                  <div className="font-medium">{hour.time}</div>
                  <div className="my-1">{getWeatherIcon(hour.condition)}</div>
                  <div>
                    {hour.temp}
                    °
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

        </Tabs>
      </CardContent>
    </Card>
  );
}
