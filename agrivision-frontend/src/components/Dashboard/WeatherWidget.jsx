import React, { useEffect, useState } from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, MapPin } from 'lucide-react';

const WeatherWidget = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    // Default location (New Delhi, India) - In a real app, we'd get this from user location
    const lat = 28.6139;
    const lon = 77.2090;

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
                );
                const data = await response.json();
                setWeather(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching weather:", error);
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    const getWeatherIcon = (code) => {
        if (code <= 3) return <Sun className="text-yellow-400 w-12 h-12" />;
        if (code <= 67) return <CloudRain className="text-blue-400 w-12 h-12" />;
        if (code <= 99) return <Cloud className="text-gray-400 w-12 h-12" />;
        return <Sun className="text-yellow-400 w-12 h-12" />;
    };

    const getWeatherDescription = (code) => {
        if (code === 0) return 'Clear Sky';
        if (code <= 3) return 'Partly Cloudy';
        if (code <= 48) return 'Foggy';
        if (code <= 67) return 'Rainy';
        if (code <= 77) return 'Snowy';
        if (code <= 99) return 'Thunderstorm';
        return 'Unknown';
    };

    if (loading) {
        return (
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
            </div>
        );
    }

    if (!weather) return null;

    const current = weather.current;
    const daily = weather.daily;

    return (
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-10 -mb-10 blur-xl"></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <div className="flex items-center gap-2 text-blue-100 mb-1">
                            <MapPin size={16} />
                            <span className="text-sm font-medium">New Delhi, IN</span>
                        </div>
                        <h3 className="text-3xl font-bold">{Math.round(current.temperature_2m)}°C</h3>
                        <p className="text-blue-100">{getWeatherDescription(current.weather_code)}</p>
                    </div>
                    <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                        {getWeatherIcon(current.weather_code)}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-blue-100 mb-1">
                            <Droplets size={14} />
                            <span className="text-xs">Humidity</span>
                        </div>
                        <p className="font-semibold">{current.relative_humidity_2m}%</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-blue-100 mb-1">
                            <Wind size={14} />
                            <span className="text-xs">Wind</span>
                        </div>
                        <p className="font-semibold">{current.wind_speed_10m} km/h</p>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-sm text-blue-100">
                    <span>H: {Math.round(daily.temperature_2m_max[0])}°</span>
                    <span>L: {Math.round(daily.temperature_2m_min[0])}°</span>
                </div>
            </div>
        </div>
    );
};

export default WeatherWidget;
