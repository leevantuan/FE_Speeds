import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type ThroughputBarVm = { x: number; y: number; h: number; label: string };

@Component({
  selector: 'app-throughput-chart-card',
  imports: [CommonModule],
  templateUrl: './throughput-chart-card.html',
  styleUrl: './throughput-chart-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThroughputChartCardComponent {
  @Input({ required: true }) bars: ThroughputBarVm[] = [];
}
