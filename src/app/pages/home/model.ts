// model.ts
export type TestSegment =
  | 'CLIENT_TO_ASSETPOINT'
  | 'ASSETPOINT_TO_SERVER'
  | 'END_TO_END'
  | 'RUN_ALL';

export type PacketSizeKey = '10KB' | '20KB' | '50KB' | '100KB' | 'CUSTOM';

export interface Endpoint {
  label: string;
  ip: string;
  meta?: string; // e.g. "(Wi-Fi)"
}

export interface TopologyMetrics {
  client: {
    rssiDbm: number;
    snrDb: number;
  };
  assetPoint: {
    speedMbps: number;
  };
  server: {
    rttMs: number | null;
  };
}

export interface SummaryKpis {
  rttAvgMs: number | null;
  jitterMs: number | null;
  packetLossPct: number | null;
  throughputMbps: number | null;
}

export interface PacketTestRow {
  packetSizeLabel: string; // e.g. "10 KB"
  sent: number;
  received: number;
  lossPct: number;
  rttAvgMs: number;
  rttP95Ms: number;
  jitterMs: number;
  throughputMbps: number;
}

export interface ChartPoint {
  xLabel: string; // time label or category label
  value: number;
}

export interface LineSeries {
  name: string;
  points: ChartPoint[];
}

export interface BarSeries {
  name: string;
  points: ChartPoint[];
}

export interface LogEntry {
  time: string; // "12:32:11"
  message: string;
  level?: 'info' | 'success' | 'warning' | 'error';
}

export interface SelectOption<T> {
  label: string;
  value: T;
}

export interface TestConfig {
  segment: TestSegment;

  client: Endpoint;
  assetPoint: Endpoint;
  server: Endpoint & { port: number };

  packetSizes: {
    selected: PacketSizeKey[]; // allow multi-select like screenshot
    customBytes?: number; // for CUSTOM
  };

  countPerSize: number;
  intervalMs: number;
  durationSec: number;
}

export interface DashboardHeader {
  siteName: string; // "YEP Hall - Floor 1"
  locationLabel: string; // "Vị trí: Cổng vào"
  runId: string; // "#1290"
  startTime: string; // "12:32:10"
}

export interface WifiTestDashboardData {
  header: DashboardHeader;

  topology: TopologyMetrics;
  kpis: SummaryKpis;

  configOptions: {
    segments: SelectOption<TestSegment>[];
    clients: SelectOption<Endpoint>[];
    countPerSize: SelectOption<number>[];
    intervalMs: SelectOption<number>[];
    durationSec: SelectOption<number>[];
    packetSizes: SelectOption<PacketSizeKey>[];
  };

  defaultConfig: TestConfig;

  tableRows: PacketTestRow[];

  charts: {
    rttAndLoss: {
      y1Label: string; // RTT
      y2Label: string; // Loss
      series: LineSeries[]; // 2 lines
    };
    throughputVsPacket: {
      series: BarSeries[]; // 1-2 bar series
    };
  };

  logs: LogEntry[];
}
