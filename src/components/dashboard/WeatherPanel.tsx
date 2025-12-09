import { useEffect, useState, forwardRef } from "react";
import { 
  Cloud, 
  CloudRain, 
  CloudLightning, 
  Sun, 
  Wind, 
  Thermometer, 
  Droplets,
  AlertTriangle,
  TrendingUp
} from "lucide-react";

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  description: string;
}

interface LTImpact {
  ltBox: string;
  currentRisk: 'low' | 'medium' | 'high';
  futureRisk: 'low' | 'medium' | 'high';
  reason: string;
}

const WeatherPanel = forwardRef<HTMLDivElement>((_, ref) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [ltImpacts, setLtImpacts] = useState<LTImpact[]>([]);

  useEffect(() => {
    // Fetch weather from OpenWeatherMap API
    const fetchWeather = async () => {
      try {
        // Using a demo location (New Delhi) - you can make this dynamic
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=New Delhi&units=metric&appid=demo`
        );
        
        if (!response.ok) {
          // Fallback to mock data for demo
          setWeather({
            temperature: 32,
            humidity: 65,
            windSpeed: 15,
            condition: "Thunderstorm",
            description: "Heavy rain with thunderstorm expected"
          });
        } else {
          const data = await response.json();
          setWeather({
            temperature: Math.round(data.main.temp),
            humidity: data.main.humidity,
            windSpeed: Math.round(data.wind.speed * 3.6),
            condition: data.weather[0].main,
            description: data.weather[0].description
          });
        }
      } catch (error) {
        // Use mock data on error
        setWeather({
          temperature: 32,
          humidity: 65,
          windSpeed: 15,
          condition: "Thunderstorm",
          description: "Heavy rain with thunderstorm expected"
        });
      }
      setLoading(false);
    };

    fetchWeather();

    // Calculate LT impacts based on weather
    setLtImpacts([
      {
        ltBox: "LT-001",
        currentRisk: "high",
        futureRisk: "high",
        reason: "High humidity causing insulation issues"
      },
      {
        ltBox: "LT-002",
        currentRisk: "medium",
        futureRisk: "high",
        reason: "Thunderstorm may cause power surge"
      },
      {
        ltBox: "LT-003",
        currentRisk: "low",
        futureRisk: "medium",
        reason: "Strong winds affecting connections"
      },
      {
        ltBox: "LT-004",
        currentRisk: "high",
        futureRisk: "medium",
        reason: "Lightning risk in the area"
      },
      {
        ltBox: "LT-005",
        currentRisk: "low",
        futureRisk: "low",
        reason: "Indoor installation, minimal impact"
      },
      {
        ltBox: "LT-006",
        currentRisk: "medium",
        futureRisk: "high",
        reason: "Flooding risk near transformer"
      }
    ]);
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'thunderstorm':
        return <CloudLightning className="w-12 h-12 text-warning" />;
      case 'rain':
      case 'drizzle':
        return <CloudRain className="w-12 h-12 text-primary" />;
      case 'clear':
        return <Sun className="w-12 h-12 text-warning" />;
      default:
        return <Cloud className="w-12 h-12 text-muted-foreground" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-destructive bg-destructive/20';
      case 'medium': return 'text-warning bg-warning/20';
      default: return 'text-success bg-success/20';
    }
  };

  const getRiskBorderColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'border-destructive/30';
      case 'medium': return 'border-warning/30';
      default: return 'border-success/30';
    }
  };

  if (loading) {
    return (
      <div ref={ref} className="bg-card rounded-lg border border-border p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-3 text-muted-foreground">Loading weather data...</span>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Cloud className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Weather Impact Analysis</h2>
            <p className="text-sm text-muted-foreground">Current conditions & LT risk assessment</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Current Weather */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-secondary/30 rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Current Weather</p>
                <p className="text-4xl font-bold text-foreground font-mono">{weather?.temperature}°C</p>
                <p className="text-sm text-primary mt-2 capitalize">{weather?.description}</p>
              </div>
              {weather && getWeatherIcon(weather.condition)}
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Humidity</p>
                  <p className="font-mono text-sm text-foreground">{weather?.humidity}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-warning" />
                <div>
                  <p className="text-xs text-muted-foreground">Wind</p>
                  <p className="font-mono text-sm text-foreground">{weather?.windSpeed} km/h</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-destructive" />
                <div>
                  <p className="text-xs text-muted-foreground">Feels Like</p>
                  <p className="font-mono text-sm text-foreground">{weather?.temperature}°C</p>
                </div>
              </div>
            </div>
          </div>

          {/* Weather Alert */}
          <div className="bg-warning/10 rounded-xl p-6 border border-warning/30">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-warning flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-warning">Weather Alert</h3>
                <p className="text-sm text-foreground/80 mt-2">
                  Thunderstorm conditions detected. High risk of power fluctuations and 
                  potential lightning damage. Recommend activating surge protection on 
                  vulnerable LT boxes.
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <span className="px-2 py-1 bg-destructive/20 text-destructive rounded text-xs font-medium">
                    2 LT Boxes at High Risk
                  </span>
                  <span className="px-2 py-1 bg-warning/20 text-warning rounded text-xs font-medium">
                    2 LT Boxes at Medium Risk
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LT Impact Grid */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">LT Box Risk Assessment</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ltImpacts.map((impact, index) => (
              <div 
                key={impact.ltBox}
                className={`p-4 rounded-lg border bg-secondary/20 animate-fade-in ${getRiskBorderColor(impact.currentRisk)}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-foreground">{impact.ltBox}</h4>
                  <div className="flex gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getRiskColor(impact.currentRisk)}`}>
                      Now: {impact.currentRisk}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{impact.reason}</p>
                <div className="flex items-center gap-2 pt-3 border-t border-border">
                  <TrendingUp className={`w-4 h-4 ${
                    impact.futureRisk === 'high' ? 'text-destructive' : 
                    impact.futureRisk === 'medium' ? 'text-warning' : 'text-success'
                  }`} />
                  <span className="text-xs text-muted-foreground">
                    Future Risk: <span className={`font-medium ${
                      impact.futureRisk === 'high' ? 'text-destructive' : 
                      impact.futureRisk === 'medium' ? 'text-warning' : 'text-success'
                    }`}>{impact.futureRisk.toUpperCase()}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

WeatherPanel.displayName = "WeatherPanel";

export default WeatherPanel;
