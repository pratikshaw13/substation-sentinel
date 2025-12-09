import { Box, Home, AlertTriangle, Zap, CloudSun } from "lucide-react";

interface HeaderStats {
  ltBoxes: number;
  houses: number;
  warnings: number;
  faults: number;
}

interface DashboardHeaderProps {
  stats: HeaderStats;
  onWeatherClick: () => void;
}

const DashboardHeader = ({ stats, onWeatherClick }: DashboardHeaderProps) => {
  return (
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
          {/* LT Boxes */}
          <div className="flex items-center gap-3 px-4 py-2 bg-secondary rounded-lg border border-border">
            <Box className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">LT Boxes</p>
              <p className="data-value text-primary">{stats.ltBoxes}</p>
            </div>
          </div>

          {/* Houses */}
          <div className="flex items-center gap-3 px-4 py-2 bg-secondary rounded-lg border border-border">
            <Home className="w-5 h-5 text-success" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Houses</p>
              <p className="data-value text-success">{stats.houses}</p>
            </div>
          </div>

          {/* Warnings */}
          <div className={`flex items-center gap-3 px-4 py-2 rounded-lg border ${
            stats.warnings > 0 
              ? 'bg-warning/10 border-warning/30 card-glow-warning' 
              : 'bg-secondary border-border'
          }`}>
            <AlertTriangle className={`w-5 h-5 ${stats.warnings > 0 ? 'text-warning status-pulse' : 'text-muted-foreground'}`} />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Warnings</p>
              <p className={`data-value ${stats.warnings > 0 ? 'text-warning' : 'text-muted-foreground'}`}>
                {stats.warnings}
              </p>
            </div>
          </div>

          {/* Faults */}
          <div className={`flex items-center gap-3 px-4 py-2 rounded-lg border ${
            stats.faults > 0 
              ? 'bg-destructive/10 border-destructive/30 card-glow-destructive' 
              : 'bg-secondary border-border'
          }`}>
            <Zap className={`w-5 h-5 ${stats.faults > 0 ? 'text-destructive status-pulse' : 'text-muted-foreground'}`} />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Faults</p>
              <p className={`data-value ${stats.faults > 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                {stats.faults}
              </p>
            </div>
          </div>

          {/* Weather Button */}
          <button
            onClick={onWeatherClick}
            className="flex items-center gap-3 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg border border-primary/30 transition-all duration-200 hover:card-glow"
          >
            <CloudSun className="w-5 h-5 text-primary" />
            <div className="text-left">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Weather</p>
              <p className="text-sm font-medium text-primary">View Impact</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
