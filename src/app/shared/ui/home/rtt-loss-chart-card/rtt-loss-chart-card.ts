import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-rtt-loss-chart-card',
  imports: [CommonModule],
  templateUrl: './rtt-loss-chart-card.html',
  styleUrl: './rtt-loss-chart-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RttLossChartCardComponent {
  @Input({ required: true }) rttPoints = '';
  @Input({ required: true }) lossPoints = '';
}
