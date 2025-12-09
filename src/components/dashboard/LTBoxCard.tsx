import { useState } from "react";
import { ChevronDown, ChevronUp, Home, Zap, Gauge, Activity } from "lucide-react";

interface House {
  id: string;
  name: string;
  hasFault: boolean;
}

interface Phase {
  name: string;
  houses: House[];
}

interface LTBoxData {
  id: string;
  name: string;
  voltage: number;
  current: number;
  powerConsumption: number;
  status: 'normal' | 'warning' | 'fault';
  phases: Phase[];
}

interface LTBoxCardProps {
  data: LTBoxData;
}

const LTBoxCard = ({ data }: LTBoxCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'fault': return 'border-destructive/50 card-glow-destructive';
      case 'warning': return 'border-warning/50 card-glow-warning';
      default: return 'border-border hover:border-primary/30';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'fault': return 'bg-destructive/20 text-destructive';
      case 'warning': return 'bg-warning/20 text-warning';
      default: return 'bg-success/20 text-success';
    }
  };

  const totalFaults = data.phases.reduce((acc, phase) => 
    acc + phase.houses.filter(h => h.hasFault).length, 0
  );

  return (
    <div className={`bg-card rounded-lg border transition-all duration-300 ${getStatusColor(data.status)}`}>
      {/* Card Header */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              data.status === 'fault' ? 'bg-destructive/20' : 
              data.status === 'warning' ? 'bg-warning/20' : 'bg-primary/20'
            }`}>
              <Zap className={`w-5 h-5 ${
                data.status === 'fault' ? 'text-destructive' : 
                data.status === 'warning' ? 'text-warning' : 'text-primary'
              }`} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{data.name}</h3>
              <p className="text-xs text-muted-foreground">ID: {data.id}</p>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${getStatusBadge(data.status)}`}>
            {data.status}
          </span>
        </div>

        {/* Metrics Grid */}
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

      {/* Phase Dropdown Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 border-t border-border bg-secondary/30 hover:bg-secondary/50 transition-colors"
      >
        <span className="text-sm font-medium text-muted-foreground">
          Phase Details {totalFaults > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-destructive/20 text-destructive rounded-full text-xs">
              {totalFaults} faults
            </span>
          )}
        </span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {/* Expanded Phase Content */}
      {isExpanded && (
        <div className="p-4 border-t border-border bg-secondary/20 animate-fade-in">
          {data.phases.map((phase, index) => (
            <div key={phase.name} className={`${index > 0 ? 'mt-4 pt-4 border-t border-border/50' : ''}`}>
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  phase.houses.some(h => h.hasFault) ? 'bg-destructive status-pulse' : 'bg-success'
                }`} />
                {phase.name}
              </h4>
              <div className="grid grid-cols-5 gap-2">
                {phase.houses.map((house) => (
                  <div
                    key={house.id}
                    className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                      house.hasFault 
                        ? 'bg-destructive/20 border border-destructive/30' 
                        : 'bg-secondary/50 border border-transparent'
                    }`}
                    title={`${house.name} - ${house.hasFault ? 'FAULT' : 'Normal'}`}
                  >
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
};

export default LTBoxCard;
