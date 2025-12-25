import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PacketTestRow } from '../../../../pages/home/model';

@Component({
  selector: 'app-packet-results-table',
  imports: [CommonModule],
  templateUrl: './packet-results-table.html',
  styleUrl: './packet-results-table.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PacketResultsTableComponent {
  @Input({ required: true }) rows: PacketTestRow[] = [];
  @Input({ required: true }) throughputMax = 1;
}
