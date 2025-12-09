import { AlertTriangle, Clock, MapPin, Wrench } from "lucide-react";

interface FaultRecord {
  id: string;
  timestamp: string;
  ltBox: string;
  phase: string;
  houseId: string;
  faultType: string;
  severity: 'low' | 'medium' | 'high';
  status: 'active' | 'resolved' | 'pending';
}

interface FaultHistoryProps {
  faults: FaultRecord[];
}

const FaultHistory = ({ faults }: FaultHistoryProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-destructive bg-destructive/20';
      case 'medium': return 'text-warning bg-warning/20';
      default: return 'text-primary bg-primary/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-destructive bg-destructive/20 border-destructive/30';
      case 'pending': return 'text-warning bg-warning/20 border-warning/30';
      default: return 'text-success bg-success/20 border-success/30';
    }
  };

  return (
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
        <span className="px-3 py-1 bg-secondary rounded-full text-sm text-muted-foreground">
          {faults.filter(f => f.status === 'active').length} Active
        </span>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full">
          <thead>
            <tr className="bg-secondary/50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Timestamp
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Fault Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Severity
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4" />
                  Status
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {faults.map((fault, index) => (
              <tr 
                key={fault.id} 
                className="hover:bg-secondary/30 transition-colors animate-slide-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="px-4 py-3">
                  <span className="font-mono text-sm text-foreground">{fault.timestamp}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">{fault.ltBox}</span>
                    <span className="text-xs text-muted-foreground">{fault.phase} • House {fault.houseId}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-foreground">{fault.faultType}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${getSeverityColor(fault.severity)}`}>
                    {fault.severity}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase border ${getStatusColor(fault.status)}`}>
                    {fault.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FaultHistory;
