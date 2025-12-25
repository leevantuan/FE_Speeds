import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  PacketSizeKey,
  TestConfig,
  TestSegment,
  WifiTestDashboardData,
} from '../../../../pages/home/model';
import { ButtonComponent } from '../../components/button/button';
import { SelectComponent } from '../../components/select/select';
import { RadioGroupComponent } from '../../components/radio-group/radio-group';
import { TextInputComponent } from '../../components/text-input/text-input';
import { PillSelectComponent } from '../../components/pill-select/pill-select';

 
type ConfigOptions = WifiTestDashboardData['configOptions'];

@Component({
  selector: 'app-test-configuration-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    SelectComponent,
    RadioGroupComponent,
    TextInputComponent,
    PillSelectComponent,
  ],
  templateUrl: './test-configuration-panel.html',
  styleUrl: './test-configuration-panel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestConfigurationPanelComponent {
  @Input({ required: true }) options!: ConfigOptions;
  @Input({ required: true }) config!: TestConfig;
  @Input() isRunning = false;
  @Input() isPaused = false;

  @Output() segmentChange = new EventEmitter<TestSegment>();
  @Output() clientIpChange = new EventEmitter<string>();

  @Output() assetPointIpChange = new EventEmitter<string>();
  @Output() serverIpChange = new EventEmitter<string>();
  @Output() serverPortChange = new EventEmitter<number>();

  @Output() togglePacketSize = new EventEmitter<PacketSizeKey>();
  @Output() customBytesChange = new EventEmitter<number>();

  @Output() countPerSizeChange = new EventEmitter<number>();
  @Output() intervalMsChange = new EventEmitter<number>();
  @Output() durationSecChange = new EventEmitter<number>();

  @Output() discoverAssetPoint = new EventEmitter<void>();
  @Output() pingAssetPoint = new EventEmitter<void>();
  @Output() pingServer = new EventEmitter<void>();

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() start = new EventEmitter<void>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() pause = new EventEmitter<void>();

  @Output() stop = new EventEmitter<void>();
  @Output() saveProfile = new EventEmitter<void>();

  /** Map clients -> select options dạng value là string ip */
  get clientIpOptions() {
    return (this.options?.clients ?? []).map((c) => ({
      label: c.label,
      value: c.value.ip,
    }));
  }

  get selectedPacketSize(): PacketSizeKey | null {
    return this.config.packetSizes.selected?.[0] ?? null;
  }

  isCustomSelected() {
    return this.selectedPacketSize === 'CUSTOM';
  }

  onPacketSizeSelect(ps: PacketSizeKey | null) {
    if (!ps) return;
    if (ps === this.selectedPacketSize) return;
    this.togglePacketSize.emit(ps);
  }
}
