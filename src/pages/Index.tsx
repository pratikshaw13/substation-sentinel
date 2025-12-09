import { useRef } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import LTBoxCard from "@/components/dashboard/LTBoxCard";
import FaultHistory from "@/components/dashboard/FaultHistory";
import WeatherPanel from "@/components/dashboard/WeatherPanel";

// Mock data for LT Boxes
const ltBoxesData = [
  {
    id: "LT-001",
    name: "LT Box Alpha",
    voltage: 415,
    current: 28.5,
    powerConsumption: 11.8,
    status: "fault" as const,
    phases: [
      {
        name: "Phase R",
        houses: [
          { id: "R1", name: "House R1", hasFault: true },
          { id: "R2", name: "House R2", hasFault: false },
          { id: "R3", name: "House R3", hasFault: false },
          { id: "R4", name: "House R4", hasFault: true },
          { id: "R5", name: "House R5", hasFault: false },
        ]
      },
      {
        name: "Phase Y",
        houses: [
          { id: "Y1", name: "House Y1", hasFault: false },
          { id: "Y2", name: "House Y2", hasFault: false },
          { id: "Y3", name: "House Y3", hasFault: false },
          { id: "Y4", name: "House Y4", hasFault: false },
          { id: "Y5", name: "House Y5", hasFault: false },
        ]
      },
      {
        name: "Phase B",
        houses: [
          { id: "B1", name: "House B1", hasFault: false },
          { id: "B2", name: "House B2", hasFault: true },
          { id: "B3", name: "House B3", hasFault: false },
          { id: "B4", name: "House B4", hasFault: false },
          { id: "B5", name: "House B5", hasFault: false },
        ]
      }
    ]
  },
  {
    id: "LT-002",
    name: "LT Box Beta",
    voltage: 418,
    current: 22.3,
    powerConsumption: 9.3,
    status: "warning" as const,
    phases: [
      {
        name: "Phase R",
        houses: [
          { id: "R1", name: "House R1", hasFault: false },
          { id: "R2", name: "House R2", hasFault: false },
          { id: "R3", name: "House R3", hasFault: true },
          { id: "R4", name: "House R4", hasFault: false },
          { id: "R5", name: "House R5", hasFault: false },
        ]
      },
      {
        name: "Phase Y",
        houses: [
          { id: "Y1", name: "House Y1", hasFault: false },
          { id: "Y2", name: "House Y2", hasFault: false },
          { id: "Y3", name: "House Y3", hasFault: false },
          { id: "Y4", name: "House Y4", hasFault: false },
          { id: "Y5", name: "House Y5", hasFault: false },
        ]
      },
      {
        name: "Phase B",
        houses: [
          { id: "B1", name: "House B1", hasFault: false },
          { id: "B2", name: "House B2", hasFault: false },
          { id: "B3", name: "House B3", hasFault: false },
          { id: "B4", name: "House B4", hasFault: false },
          { id: "B5", name: "House B5", hasFault: false },
        ]
      }
    ]
  },
  {
    id: "LT-003",
    name: "LT Box Gamma",
    voltage: 412,
    current: 31.2,
    powerConsumption: 12.9,
    status: "normal" as const,
    phases: [
      {
        name: "Phase R",
        houses: [
          { id: "R1", name: "House R1", hasFault: false },
          { id: "R2", name: "House R2", hasFault: false },
          { id: "R3", name: "House R3", hasFault: false },
          { id: "R4", name: "House R4", hasFault: false },
          { id: "R5", name: "House R5", hasFault: false },
        ]
      },
      {
        name: "Phase Y",
        houses: [
          { id: "Y1", name: "House Y1", hasFault: false },
          { id: "Y2", name: "House Y2", hasFault: false },
          { id: "Y3", name: "House Y3", hasFault: false },
          { id: "Y4", name: "House Y4", hasFault: false },
          { id: "Y5", name: "House Y5", hasFault: false },
        ]
      },
      {
        name: "Phase B",
        houses: [
          { id: "B1", name: "House B1", hasFault: false },
          { id: "B2", name: "House B2", hasFault: false },
          { id: "B3", name: "House B3", hasFault: false },
          { id: "B4", name: "House B4", hasFault: false },
          { id: "B5", name: "House B5", hasFault: false },
        ]
      }
    ]
  },
  {
    id: "LT-004",
    name: "LT Box Delta",
    voltage: 420,
    current: 18.7,
    powerConsumption: 7.9,
    status: "fault" as const,
    phases: [
      {
        name: "Phase R",
        houses: [
          { id: "R1", name: "House R1", hasFault: true },
          { id: "R2", name: "House R2", hasFault: true },
          { id: "R3", name: "House R3", hasFault: false },
          { id: "R4", name: "House R4", hasFault: false },
          { id: "R5", name: "House R5", hasFault: false },
        ]
      },
      {
        name: "Phase Y",
        houses: [
          { id: "Y1", name: "House Y1", hasFault: false },
          { id: "Y2", name: "House Y2", hasFault: true },
          { id: "Y3", name: "House Y3", hasFault: false },
          { id: "Y4", name: "House Y4", hasFault: false },
          { id: "Y5", name: "House Y5", hasFault: false },
        ]
      },
      {
        name: "Phase B",
        houses: [
          { id: "B1", name: "House B1", hasFault: false },
          { id: "B2", name: "House B2", hasFault: false },
          { id: "B3", name: "House B3", hasFault: false },
          { id: "B4", name: "House B4", hasFault: false },
          { id: "B5", name: "House B5", hasFault: false },
        ]
      }
    ]
  },
  {
    id: "LT-005",
    name: "LT Box Epsilon",
    voltage: 414,
    current: 25.4,
    powerConsumption: 10.5,
    status: "normal" as const,
    phases: [
      {
        name: "Phase R",
        houses: [
          { id: "R1", name: "House R1", hasFault: false },
          { id: "R2", name: "House R2", hasFault: false },
          { id: "R3", name: "House R3", hasFault: false },
          { id: "R4", name: "House R4", hasFault: false },
          { id: "R5", name: "House R5", hasFault: false },
        ]
      },
      {
        name: "Phase Y",
        houses: [
          { id: "Y1", name: "House Y1", hasFault: false },
          { id: "Y2", name: "House Y2", hasFault: false },
          { id: "Y3", name: "House Y3", hasFault: false },
          { id: "Y4", name: "House Y4", hasFault: false },
          { id: "Y5", name: "House Y5", hasFault: false },
        ]
      },
      {
        name: "Phase B",
        houses: [
          { id: "B1", name: "House B1", hasFault: false },
          { id: "B2", name: "House B2", hasFault: false },
          { id: "B3", name: "House B3", hasFault: false },
          { id: "B4", name: "House B4", hasFault: false },
          { id: "B5", name: "House B5", hasFault: false },
        ]
      }
    ]
  },
  {
    id: "LT-006",
    name: "LT Box Zeta",
    voltage: 416,
    current: 29.1,
    powerConsumption: 12.1,
    status: "warning" as const,
    phases: [
      {
        name: "Phase R",
        houses: [
          { id: "R1", name: "House R1", hasFault: false },
          { id: "R2", name: "House R2", hasFault: true },
          { id: "R3", name: "House R3", hasFault: false },
          { id: "R4", name: "House R4", hasFault: false },
          { id: "R5", name: "House R5", hasFault: false },
        ]
      },
      {
        name: "Phase Y",
        houses: [
          { id: "Y1", name: "House Y1", hasFault: false },
          { id: "Y2", name: "House Y2", hasFault: false },
          { id: "Y3", name: "House Y3", hasFault: false },
          { id: "Y4", name: "House Y4", hasFault: false },
          { id: "Y5", name: "House Y5", hasFault: false },
        ]
      },
      {
        name: "Phase B",
        houses: [
          { id: "B1", name: "House B1", hasFault: false },
          { id: "B2", name: "House B2", hasFault: false },
          { id: "B3", name: "House B3", hasFault: true },
          { id: "B4", name: "House B4", hasFault: false },
          { id: "B5", name: "House B5", hasFault: false },
        ]
      }
    ]
  }
];

// Mock fault history data
const faultHistoryData = [
  {
    id: "F001",
    timestamp: "2024-01-15 14:32:18",
    ltBox: "LT-001",
    phase: "Phase R",
    houseId: "R1",
    faultType: "Overcurrent",
    severity: "high" as const,
    status: "active" as const
  },
  {
    id: "F002",
    timestamp: "2024-01-15 14:28:45",
    ltBox: "LT-004",
    phase: "Phase Y",
    houseId: "Y2",
    faultType: "Voltage Drop",
    severity: "medium" as const,
    status: "pending" as const
  },
  {
    id: "F003",
    timestamp: "2024-01-15 13:55:22",
    ltBox: "LT-001",
    phase: "Phase R",
    houseId: "R4",
    faultType: "Short Circuit",
    severity: "high" as const,
    status: "active" as const
  },
  {
    id: "F004",
    timestamp: "2024-01-15 12:18:09",
    ltBox: "LT-006",
    phase: "Phase R",
    houseId: "R2",
    faultType: "Overload",
    severity: "medium" as const,
    status: "active" as const
  },
  {
    id: "F005",
    timestamp: "2024-01-15 11:42:33",
    ltBox: "LT-002",
    phase: "Phase R",
    houseId: "R3",
    faultType: "Earth Fault",
    severity: "low" as const,
    status: "resolved" as const
  },
  {
    id: "F006",
    timestamp: "2024-01-15 10:15:47",
    ltBox: "LT-004",
    phase: "Phase R",
    houseId: "R1",
    faultType: "Phase Imbalance",
    severity: "medium" as const,
    status: "resolved" as const
  },
  {
    id: "F007",
    timestamp: "2024-01-15 09:22:11",
    ltBox: "LT-001",
    phase: "Phase B",
    houseId: "B2",
    faultType: "Insulation Failure",
    severity: "high" as const,
    status: "active" as const
  },
  {
    id: "F008",
    timestamp: "2024-01-14 22:45:38",
    ltBox: "LT-006",
    phase: "Phase B",
    houseId: "B3",
    faultType: "Neutral Fault",
    severity: "low" as const,
    status: "pending" as const
  }
];

const Index = () => {
  const weatherRef = useRef<HTMLDivElement>(null);

  // Calculate header stats
  const totalHouses = ltBoxesData.reduce((acc, lt) => 
    acc + lt.phases.reduce((phaseAcc, phase) => phaseAcc + phase.houses.length, 0), 0
  );

  const activeFaults = faultHistoryData.filter(f => f.status === 'active').length;
  const warnings = faultHistoryData.filter(f => f.status === 'pending').length;

  const scrollToWeather = () => {
    weatherRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <DashboardHeader
        stats={{
          ltBoxes: ltBoxesData.length,
          houses: totalHouses,
          warnings: warnings,
          faults: activeFaults
        }}
        onWeatherClick={scrollToWeather}
      />

      {/* Main Content */}
      <main className="p-6 space-y-8">
        {/* LT Boxes Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-semibold text-foreground">LT Box Monitoring</h2>
            <span className="px-3 py-1 bg-secondary rounded-full text-sm text-muted-foreground">
              {ltBoxesData.length} Units
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {ltBoxesData.map((ltBox) => (
              <LTBoxCard key={ltBox.id} data={ltBox} />
            ))}
          </div>
        </section>

        {/* Fault History Section */}
        <section>
          <FaultHistory faults={faultHistoryData} />
        </section>

        {/* Weather Section */}
        <section>
          <WeatherPanel ref={weatherRef} />
        </section>
      </main>
    </div>
  );
};

export default Index;
