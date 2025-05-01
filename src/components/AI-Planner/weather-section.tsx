/* eslint-disable react/no-array-index-key */
'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Cloud, CloudRain, Sun, Thermometer, Wind } from 'lucide-react';
import { useState } from 'react';

export default function WeatherSection() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState({
    location: 'Paris, France',
    current: {
      temp: 22,
      condition: 'Sunny',
      humidity: 65,
      wind: 12,
    },
    forecast: [
      { day: 'Mon', temp: 22, condition: 'sunny' },
      { day: 'Tue', temp: 24, condition: 'sunny' },
      { day: 'Wed', temp: 21, condition: 'cloudy' },
      { day: 'Thu', temp: 19, condition: 'rainy' },
      { day: 'Fri', temp: 20, condition: 'cloudy' },
    ],
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would fetch weather data from an API
    // console.log('Searching for weather in:', location);
    // Mock update for demo purposes
    if (location.trim()) {
      setWeatherData({
        ...weatherData,
        location,
      });
      setLocation('');
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="h-6 w-6 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="h-6 w-6 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="h-6 w-6 text-blue-500" />;
      default:
        return <Sun className="h-6 w-6 text-yellow-500" />;
    }
  };

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
              {weatherData.current.humidity}
              %
            </span>
          </div>
          <div className="flex items-center">
            <Wind className="h-5 w-5 mr-2 text-green-500" />
            <span>
              Wind:
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
              {weatherData.forecast.map((day, index) => (
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
            <div className="flex flex-col gap-2 mt-4">
              <p className="text-center text-gray-500 dark:text-gray-400">
                Hourly forecast available after selecting a specific date
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
