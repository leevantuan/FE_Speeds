import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { LogEntry } from '../../../../pages/home/model';

@Component({
  selector: 'app-logs-panel',
  imports: [CommonModule],
  templateUrl: './logs-panel.html',
  styleUrl: './logs-panel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogsPanelComponent {
  @Input({ required: true }) logs: LogEntry[] = [];

  @Output() copyLog = new EventEmitter<void>();
  @Output() exportCsv = new EventEmitter<void>();

  levelClass(level?: LogEntry['level']) {
    return {
      'text-slate-700': level === 'info' || !level,
      'text-emerald-700 font-semibold': level === 'success',
      'text-orange-700 font-semibold': level === 'warning',
      'text-red-700 font-semibold': level === 'error',
    };
  }
}
