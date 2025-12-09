import { useRef, useState, useEffect } from "react";
import { 
  Box, Home, AlertTriangle, Zap, CloudSun, ChevronDown, ChevronUp, 
  Gauge, Activity, Clock, MapPin, Wrench, Cloud, CloudRain, 
  CloudLightning, Sun, Wind, Thermometer, Droplets, TrendingUp 
} from "lucide-react";

// Mock data for LT Boxes
const ltBoxesData = [
  {
    id: "LT-001",
    name: "LT Box Alpha",
    voltage: 415,
    current: 28.5,
    powerConsumption: 11.8,
    status: "fault",
    phases: [
      { name: "Phase R", houses: [{ id: "R1", name: "House R1", hasFault: true }, { id: "R2", name: "House R2", hasFault: false }, { id: "R3", name: "House R3", hasFault: false }, { id: "R4", name: "House R4", hasFault: true }, { id: "R5", name: "House R5", hasFault: false }] },
      { name: "Phase Y", houses: [{ id: "Y1", name: "House Y1", hasFault: false }, { id: "Y2", name: "House Y2", hasFault: false }, { id: "Y3", name: "House Y3", hasFault: false }, { id: "Y4", name: "House Y4", hasFault: false }, { id: "Y5", name: "House Y5", hasFault: false }] },
      { name: "Phase B", houses: [{ id: "B1", name: "House B1", hasFault: false }, { id: "B2", name: "House B2", hasFault: true }, { id: "B3", name: "House B3", hasFault: false }, { id: "B4", name: "House B4", hasFault: false }, { id: "B5", name: "House B5", hasFault: false }] }
    ]
  },
  {
    id: "LT-002",
    name: "LT Box Beta",
    voltage: 418,
    current: 22.3,
    powerConsumption: 9.3,
    status: "warning",
    phases: [
      { name: "Phase R", houses: [{ id: "R1", name: "House R1", hasFault: false }, { id: "R2", name: "House R2", hasFault: false }, { id: "R3", name: "House R3", hasFault: true }, { id: "R4", name: "House R4", hasFault: false }, { id: "R5", name: "House R5", hasFault: false }] },
      { name: "Phase Y", houses: [{ id: "Y1", name: "House Y1", hasFault: false }, { id: "Y2", name: "House Y2", hasFault: false }, { id: "Y3", name: "House Y3", hasFault: false }, { id: "Y4", name: "House Y4", hasFault: false }, { id: "Y5", name: "House Y5", hasFault: false }] },
      { name: "Phase B", houses: [{ id: "B1", name: "House B1", hasFault: false }, { id: "B2", name: "House B2", hasFault: false }, { id: "B3", name: "House B3", hasFault: false }, { id: "B4", name: "House B4", hasFault: false }, { id: "B5", name: "House B5", hasFault: false }] }
    ]
  },
  {
    id: "LT-003",
    name: "LT Box Gamma",
    voltage: 412,
    current: 31.2,
    powerConsumption: 12.9,
    status: "normal",
    phases: [
      { name: "Phase R", houses: [{ id: "R1", name: "House R1", hasFault: false }, { id: "R2", name: "House R2", hasFault: false }, { id: "R3", name: "House R3", hasFault: false }, { id: "R4", name: "House R4", hasFault: false }, { id: "R5", name: "House R5", hasFault: false }] },
      { name: "Phase Y", houses: [{ id: "Y1", name: "House Y1", hasFault: false }, { id: "Y2", name: "House Y2", hasFault: false }, { id: "Y3", name: "House Y3", hasFault: false }, { id: "Y4", name: "House Y4", hasFault: false }, { id: "Y5", name: "House Y5", hasFault: false }] },
      { name: "Phase B", houses: [{ id: "B1", name: "House B1", hasFault: false }, { id: "B2", name: "House B2", hasFault: false }, { id: "B3", name: "House B3", hasFault: false }, { id: "B4", name: "House B4", hasFault: false }, { id: "B5", name: "House B5", hasFault: false }] }
    ]
  },
  {
    id: "LT-004",
    name: "LT Box Delta",
    voltage: 420,
    current: 18.7,
    powerConsumption: 7.9,
    status: "fault",
    phases: [
      { name: "Phase R", houses: [{ id: "R1", name: "House R1", hasFault: true }, { id: "R2", name: "House R2", hasFault: true }, { id: "R3", name: "House R3", hasFault: false }, { id: "R4", name: "House R4", hasFault: false }, { id: "R5", name: "House R5", hasFault: false }] },
      { name: "Phase Y", houses: [{ id: "Y1", name: "House Y1", hasFault: false }, { id: "Y2", name: "House Y2", hasFault: true }, { id: "Y3", name: "House Y3", hasFault: false }, { id: "Y4", name: "House Y4", hasFault: false }, { id: "Y5", name: "House Y5", hasFault: false }] },
      { name: "Phase B", houses: [{ id: "B1", name: "House B1", hasFault: false }, { id: "B2", name: "House B2", hasFault: false }, { id: "B3", name: "House B3", hasFault: false }, { id: "B4", name: "House B4", hasFault: false }, { id: "B5", name: "House B5", hasFault: false }] }
    ]
  },
  {
    id: "LT-005",
    name: "LT Box Epsilon",
    voltage: 414,
    current: 25.4,
    powerConsumption: 10.5,
    status: "normal",
    phases: [
      { name: "Phase R", houses: [{ id: "R1", name: "House R1", hasFault: false }, { id: "R2", name: "House R2", hasFault: false }, { id: "R3", name: "House R3", hasFault: false }, { id: "R4", name: "House R4", hasFault: false }, { id: "R5", name: "House R5", hasFault: false }] },
      { name: "Phase Y", houses: [{ id: "Y1", name: "House Y1", hasFault: false }, { id: "Y2", name: "House Y2", hasFault: false }, { id: "Y3", name: "House Y3", hasFault: false }, { id: "Y4", name: "House Y4", hasFault: false }, { id: "Y5", name: "House Y5", hasFault: false }] },
      { name: "Phase B", houses: [{ id: "B1", name: "House B1", hasFault: false }, { id: "B2", name: "House B2", hasFault: false }, { id: "B3", name: "House B3", hasFault: false }, { id: "B4", name: "House B4", hasFault: false }, { id: "B5", name: "House B5", hasFault: false }] }
    ]
  },
  {
    id: "LT-006",
    name: "LT Box Zeta",
    voltage: 416,
    current: 29.1,
    powerConsumption: 12.1,
    status: "warning",
    phases: [
      { name: "Phase R", houses: [{ id: "R1", name: "House R1", hasFault: false }, { id: "R2", name: "House R2", hasFault: true }, { id: "R3", name: "House R3", hasFault: false }, { id: "R4", name: "House R4", hasFault: false }, { id: "R5", name: "House R5", hasFault: false }] },
      { name: "Phase Y", houses: [{ id: "Y1", name: "House Y1", hasFault: false }, { id: "Y2", name: "House Y2", hasFault: false }, { id: "Y3", name: "House Y3", hasFault: false }, { id: "Y4", name: "House Y4", hasFault: false }, { id: "Y5", name: "House Y5", hasFault: false }] },
      { name: "Phase B", houses: [{ id: "B1", name: "House B1", hasFault: false }, { id: "B2", name: "House B2", hasFault: false }, { id: "B3", name: "House B3", hasFault: true }, { id: "B4", name: "House B4", hasFault: false }, { id: "B5", name: "House B5", hasFault: false }] }
    ]
  }
];

// Mock fault history data
const faultHistoryData = [
  { id: "F001", timestamp: "2024-01-15 14:32:18", ltBox: "LT-001", phase: "Phase R", houseId: "R1", faultType: "Overcurrent", severity: "high", status: "active" },
  { id: "F002", timestamp: "2024-01-15 14:28:45", ltBox: "LT-004", phase: "Phase Y", houseId: "Y2", faultType: "Voltage Drop", severity: "medium", status: "pending" },
  { id: "F003", timestamp: "2024-01-15 13:55:22", ltBox: "LT-001", phase: "Phase R", houseId: "R4", faultType: "Short Circuit", severity: "high", status: "active" },
  { id: "F004", timestamp: "2024-01-15 12:18:09", ltBox: "LT-006", phase: "Phase R", houseId: "R2", faultType: "Overload", severity: "medium", status: "active" },
  { id: "F005", timestamp: "2024-01-15 11:42:33", ltBox: "LT-002", phase: "Phase R", houseId: "R3", faultType: "Earth Fault", severity: "low", status: "resolved" },
  { id: "F006", timestamp: "2024-01-15 10:15:47", ltBox: "LT-004", phase: "Phase R", houseId: "R1", faultType: "Phase Imbalance", severity: "medium", status: "resolved" },
  { id: "F007", timestamp: "2024-01-15 09:22:11", ltBox: "LT-001", phase: "Phase B", houseId: "B2", faultType: "Insulation Failure", severity: "high", status: "active" },
  { id: "F008", timestamp: "2024-01-14 22:45:38", ltBox: "LT-006", phase: "Phase B", houseId: "B3", faultType: "Neutral Fault", severity: "low", status: "pending" }
];

// LT Box Card Component
function LTBoxCard({ data }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'fault': return 'border-destructive/50 card-glow-destructive';
      case 'warning': return 'border-warning/50 card-glow-warning';
      default: return 'border-border hover:border-primary/30';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'fault': return 'bg-destructive/20 text-destructive';
      case 'warning': return 'bg-warning/20 text-warning';
      default: return 'bg-success/20 text-success';
    }
  };

  const totalFaults = data.phases.reduce((acc, phase) => acc + phase.houses.filter(h => h.hasFault).length, 0);

  return (
    <div className={`bg-card rounded-lg border transition-all duration-300 ${getStatusColor(data.status)}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${data.status === 'fault' ? 'bg-destructive/20' : data.status === 'warning' ? 'bg-warning/20' : 'bg-primary/20'}`}>
              <Zap className={`w-5 h-5 ${data.status === 'fault' ? 'text-destructive' : data.status === 'warning' ? 'text-warning' : 'text-primary'}`} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{data.name}</h3>
              <p className="text-xs text-muted-foreground">ID: {data.id}</p>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${getStatusBadge(data.status)}`}>{data.status}</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-secondary/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Gauge className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Voltage</span>
            </div>
            <p className="data-value text-foreground">{data.voltage}<span className="text-sm text-muted-foreground ml-1">V</span></p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-warning" />
              <span className="text-xs text-muted-foreground">Current</span>
            </div>
            <p className="data-value text-foreground">{data.current}<span className="text-sm text-muted-foreground ml-1">A</span></p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-success" />
              <span className="text-xs text-muted-foreground">Power</span>
            </div>
            <p className="data-value text-foreground">{data.powerConsumption}<span className="text-sm text-muted-foreground ml-1">kW</span></p>
          </div>
        </div>
      </div>

      <button onClick={() => setIsExpanded(!isExpanded)} className="w-full flex items-center justify-between px-4 py-3 border-t border-border bg-secondary/30 hover:bg-secondary/50 transition-colors">
        <span className="text-sm font-medium text-muted-foreground">
          Phase Details {totalFaults > 0 && <span className="ml-2 px-2 py-0.5 bg-destructive/20 text-destructive rounded-full text-xs">{totalFaults} faults</span>}
        </span>
        {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>

      {isExpanded && (
        <div className="p-4 border-t border-border bg-secondary/20 animate-fade-in">
          {data.phases.map((phase, index) => (
            <div key={phase.name} className={index > 0 ? 'mt-4 pt-4 border-t border-border/50' : ''}>
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${phase.houses.some(h => h.hasFault) ? 'bg-destructive status-pulse' : 'bg-success'}`} />
                {phase.name}
              </h4>
              <div className="grid grid-cols-5 gap-2">
                {phase.houses.map((house) => (
                  <div key={house.id} className={`flex flex-col items-center p-2 rounded-lg transition-all ${house.hasFault ? 'bg-destructive/20 border border-destructive/30' : 'bg-secondary/50 border border-transparent'}`} title={`${house.name} - ${house.hasFault ? 'FAULT' : 'Normal'}`}>
                    <Home className={`w-5 h-5 ${house.hasFault ? 'text-destructive' : 'text-success'}`} />
                    <span className="text-xs text-muted-foreground mt-1">{house.id}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Main Dashboard Component
const Index = () => {
  const weatherRef = useRef(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedCards, setExpandedCards] = useState({});

  const totalHouses = ltBoxesData.reduce((acc, lt) => acc + lt.phases.reduce((phaseAcc, phase) => phaseAcc + phase.houses.length, 0), 0);
  const activeFaults = faultHistoryData.filter(f => f.status === 'active').length;
  const warnings = faultHistoryData.filter(f => f.status === 'pending').length;

  const scrollToWeather = () => weatherRef.current?.scrollIntoView({ behavior: 'smooth' });

  const ltImpacts = [
    { ltBox: "LT-001", currentRisk: "high", futureRisk: "high", reason: "High humidity causing insulation issues" },
    { ltBox: "LT-002", currentRisk: "medium", futureRisk: "high", reason: "Thunderstorm may cause power surge" },
    { ltBox: "LT-003", currentRisk: "low", futureRisk: "medium", reason: "Strong winds affecting connections" },
    { ltBox: "LT-004", currentRisk: "high", futureRisk: "medium", reason: "Lightning risk in the area" },
    { ltBox: "LT-005", currentRisk: "low", futureRisk: "low", reason: "Indoor installation, minimal impact" },
    { ltBox: "LT-006", currentRisk: "medium", futureRisk: "high", reason: "Flooding risk near transformer" }
  ];

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=New Delhi&units=metric&appid=demo`);
        if (!response.ok) throw new Error();
        const data = await response.json();
        setWeather({ temperature: Math.round(data.main.temp), humidity: data.main.humidity, windSpeed: Math.round(data.wind.speed * 3.6), condition: data.weather[0].main, description: data.weather[0].description });
      } catch {
        setWeather({ temperature: 32, humidity: 65, windSpeed: 15, condition: "Thunderstorm", description: "Heavy rain with thunderstorm expected" });
      }
      setLoading(false);
    };
    fetchWeather();
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-destructive bg-destructive/20';
      case 'medium': return 'text-warning bg-warning/20';
      default: return 'text-primary bg-primary/20';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-destructive bg-destructive/20 border-destructive/30';
      case 'pending': return 'text-warning bg-warning/20 border-warning/30';
      default: return 'text-success bg-success/20 border-success/30';
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'thunderstorm': return <CloudLightning className="w-12 h-12 text-warning" />;
      case 'rain': case 'drizzle': return <CloudRain className="w-12 h-12 text-primary" />;
      case 'clear': return <Sun className="w-12 h-12 text-warning" />;
      default: return <Cloud className="w-12 h-12 text-muted-foreground" />;
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'text-destructive bg-destructive/20';
      case 'medium': return 'text-warning bg-warning/20';
      default: return 'text-success bg-success/20';
    }
  };

  const getRiskBorderColor = (risk) => {
    switch (risk) {
      case 'high': return 'border-destructive/30';
      case 'medium': return 'border-warning/30';
      default: return 'border-success/30';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Substation Dashboard</h1>
              <p className="text-sm text-muted-foreground">Real-time Power Grid Monitoring</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 bg-secondary rounded-lg border border-border">
              <Box className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">LT Boxes</p>
                <p className="data-value text-primary">{ltBoxesData.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-secondary rounded-lg border border-border">
              <Home className="w-5 h-5 text-success" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Houses</p>
                <p className="data-value text-success">{totalHouses}</p>
              </div>
            </div>
            <div className={`flex items-center gap-3 px-4 py-2 rounded-lg border ${warnings > 0 ? 'bg-warning/10 border-warning/30 card-glow-warning' : 'bg-secondary border-border'}`}>
              <AlertTriangle className={`w-5 h-5 ${warnings > 0 ? 'text-warning status-pulse' : 'text-muted-foreground'}`} />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Warnings</p>
                <p className={`data-value ${warnings > 0 ? 'text-warning' : 'text-muted-foreground'}`}>{warnings}</p>
              </div>
            </div>
            <div className={`flex items-center gap-3 px-4 py-2 rounded-lg border ${activeFaults > 0 ? 'bg-destructive/10 border-destructive/30 card-glow-destructive' : 'bg-secondary border-border'}`}>
              <Zap className={`w-5 h-5 ${activeFaults > 0 ? 'text-destructive status-pulse' : 'text-muted-foreground'}`} />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Faults</p>
                <p className={`data-value ${activeFaults > 0 ? 'text-destructive' : 'text-muted-foreground'}`}>{activeFaults}</p>
              </div>
            </div>
            <button onClick={scrollToWeather} className="flex items-center gap-3 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg border border-primary/30 transition-all duration-200 hover:card-glow">
              <CloudSun className="w-5 h-5 text-primary" />
              <div className="text-left">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Weather</p>
                <p className="text-sm font-medium text-primary">View Impact</p>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-8">
        {/* LT Boxes Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-semibold text-foreground">LT Box Monitoring</h2>
            <span className="px-3 py-1 bg-secondary rounded-full text-sm text-muted-foreground">{ltBoxesData.length} Units</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {ltBoxesData.map((ltBox) => <LTBoxCard key={ltBox.id} data={ltBox} />)}
          </div>
        </section>

        {/* Fault History Section */}
        <section>
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Fault History</h2>
                  <p className="text-sm text-muted-foreground">Recent fault records and status</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-secondary rounded-full text-sm text-muted-foreground">{activeFaults} Active</span>
            </div>
            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary/50">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider"><div className="flex items-center gap-2"><Clock className="w-4 h-4" />Timestamp</div></th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider"><div className="flex items-center gap-2"><MapPin className="w-4 h-4" />Location</div></th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fault Type</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Severity</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider"><div className="flex items-center gap-2"><Wrench className="w-4 h-4" />Status</div></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {faultHistoryData.map((fault, index) => (
                    <tr key={fault.id} className="hover:bg-secondary/30 transition-colors animate-slide-in" style={{ animationDelay: `${index * 50}ms` }}>
                      <td className="px-4 py-3"><span className="font-mono text-sm text-foreground">{fault.timestamp}</span></td>
                      <td className="px-4 py-3"><div className="flex flex-col"><span className="text-sm font-medium text-foreground">{fault.ltBox}</span><span className="text-xs text-muted-foreground">{fault.phase} • House {fault.houseId}</span></div></td>
                      <td className="px-4 py-3"><span className="text-sm text-foreground">{fault.faultType}</span></td>
                      <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${getSeverityColor(fault.severity)}`}>{fault.severity}</span></td>
                      <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium uppercase border ${getStatusColor(fault.status)}`}>{fault.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Weather Section */}
        <section ref={weatherRef}>
          <div className="bg-card rounded-lg border border-border overflow-hidden">
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
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <span className="ml-3 text-muted-foreground">Loading weather data...</span>
                </div>
              ) : (
                <>
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
                        <div className="flex items-center gap-2"><Droplets className="w-4 h-4 text-primary" /><div><p className="text-xs text-muted-foreground">Humidity</p><p className="font-mono text-sm text-foreground">{weather?.humidity}%</p></div></div>
                        <div className="flex items-center gap-2"><Wind className="w-4 h-4 text-warning" /><div><p className="text-xs text-muted-foreground">Wind</p><p className="font-mono text-sm text-foreground">{weather?.windSpeed} km/h</p></div></div>
                        <div className="flex items-center gap-2"><Thermometer className="w-4 h-4 text-destructive" /><div><p className="text-xs text-muted-foreground">Feels Like</p><p className="font-mono text-sm text-foreground">{weather?.temperature}°C</p></div></div>
                      </div>
                    </div>
                    <div className="bg-warning/10 rounded-xl p-6 border border-warning/30">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-6 h-6 text-warning flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-warning">Weather Alert</h3>
                          <p className="text-sm text-foreground/80 mt-2">Thunderstorm conditions detected. High risk of power fluctuations and potential lightning damage. Recommend activating surge protection on vulnerable LT boxes.</p>
                          <div className="flex items-center gap-2 mt-4">
                            <span className="px-2 py-1 bg-destructive/20 text-destructive rounded text-xs font-medium">2 LT Boxes at High Risk</span>
                            <span className="px-2 py-1 bg-warning/20 text-warning rounded text-xs font-medium">2 LT Boxes at Medium Risk</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-foreground">LT Box Risk Assessment</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {ltImpacts.map((impact, index) => (
                        <div key={impact.ltBox} className={`p-4 rounded-lg border bg-secondary/20 animate-fade-in ${getRiskBorderColor(impact.currentRisk)}`} style={{ animationDelay: `${index * 100}ms` }}>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-foreground">{impact.ltBox}</h4>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${getRiskColor(impact.currentRisk)}`}>Now: {impact.currentRisk}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{impact.reason}</p>
                          <div className="flex items-center gap-2 pt-3 border-t border-border">
                            <TrendingUp className={`w-4 h-4 ${impact.futureRisk === 'high' ? 'text-destructive' : impact.futureRisk === 'medium' ? 'text-warning' : 'text-success'}`} />
                            <span className="text-xs text-muted-foreground">Future Risk: <span className={`font-medium ${impact.futureRisk === 'high' ? 'text-destructive' : impact.futureRisk === 'medium' ? 'text-warning' : 'text-success'}`}>{impact.futureRisk.toUpperCase()}</span></span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
