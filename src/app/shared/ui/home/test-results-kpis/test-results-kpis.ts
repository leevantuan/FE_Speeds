import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SummaryKpis } from '../../../../pages/home/model';

@Component({
  selector: 'app-test-results-kpis',
  imports: [CommonModule],
  templateUrl: './test-results-kpis.html',
  styleUrl: './test-results-kpis.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestResultsKpisComponent {
  @Input({ required: true }) kpis!: SummaryKpis;
}
