import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NetworkTopologyCardComponent } from '../../shared/ui/home/network-topology-card/network-topology-card';
import { TestResultsKpisComponent } from '../../shared/ui/home/test-results-kpis/test-results-kpis';
import { PacketResultsTableComponent } from '../../shared/ui/home/packet-results-table/packet-results-table';
import { RttLossChartCardComponent } from '../../shared/ui/home/rtt-loss-chart-card/rtt-loss-chart-card';
import { ThroughputChartCardComponent } from '../../shared/ui/home/throughput-chart-card/throughput-chart-card';
import { LogsPanelComponent } from '../../shared/ui/home/logs-panel/logs-panel';
import { TestConfigurationPanelComponent } from '../../shared/ui/home/test-configuration-panel/test-configuration-panel';
import { WifiTestDashboardData } from './model';
import { WIFI_TEST_DASHBOARD_MOCK } from './mock';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    NetworkTopologyCardComponent,
    TestResultsKpisComponent,
    PacketResultsTableComponent,
    RttLossChartCardComponent,
    ThroughputChartCardComponent,
    LogsPanelComponent,
    TestConfigurationPanelComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly data: WifiTestDashboardData = WIFI_TEST_DASHBOARD_MOCK;

  get throughputMax(): number {
    return Math.max(...this.data.tableRows.map((r) => r.throughputMbps), 1);
  }

  get rttPolylinePoints(): string {
    const s = this.data.charts.rttAndLoss.series[0];
    const values = s?.points?.map((p) => p.value) ?? [];
    return this.toPolylinePoints(values, 5);
  }

  get lossPolylinePoints(): string {
    const s = this.data.charts.rttAndLoss.series[1];
    const values = s?.points?.map((p) => p.value) ?? [];
    return this.toPolylinePoints(values, 20);
  }

  // eslint-disable-next-line @typescript-eslint/array-type
  get throughputBars(): Array<{ x: number; y: number; h: number; label: string }> {
    const pts = this.data.charts.throughputVsPacket.series[0]?.points ?? [];
    const baseY = 120;
    const scale = 0.25;

    return pts.map((p, i) => {
      const h = (p.value ?? 0) * scale;
      return {
        x: 30 + i * 85,
        y: baseY - h,
        h,
        label: p.xLabel ?? '',
      };
    });
  }

  private toPolylinePoints(values: number[], scale: number): string {
    const xStart = 20;
    const xStep = 54;
    const yBase = 120;

    return values.map((v, i) => `${xStart + i * xStep},${yBase - v * scale}`).join(' ');
  }

  // KPI demo: nếu bạn muốn lấy KPI từ mock thì dùng data.kpis,
  // còn muốn tính từ tableRows thì bạn tự compute ở đây.
  get kpis() {
    const rows = this.data.tableRows;
    const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / Math.max(arr.length, 1);

    const rttAvg = avg(rows.map((r) => r.rttAvgMs));
    const jitter = avg(rows.map((r) => r.jitterMs));
    const loss = avg(rows.map((r) => r.lossPct));
    const throughput = avg(rows.map((r) => r.throughputMbps));

    return {
      rttAvgMs: +rttAvg.toFixed(1),
      jitterMs: +jitter.toFixed(1),
      packetLossPct: +loss.toFixed(1),
      throughputMbps: +throughput.toFixed(0),
    };
  }
}
