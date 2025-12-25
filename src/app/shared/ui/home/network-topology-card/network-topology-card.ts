import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TopologyMetrics } from '../../../../pages/home/model';

@Component({
  selector: 'app-network-topology-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './network-topology-card.html',
  styleUrl: './network-topology-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetworkTopologyCardComponent {
  @Input({ required: true }) topology!: TopologyMetrics;

  readonly icons = {
    client: 'assets/topology/client.svg',
    assetpoint: 'assets/topology/assetpoint.svg',
    server: 'assets/topology/server.svg',
  } as const;
}
