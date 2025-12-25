import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AppOption } from '../../../types/option-types';

@Component({
  selector: 'app-radio-group',
  imports: [CommonModule],
  templateUrl: './radio-group.html',
  styleUrl: './radio-group.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true,
    },
  ],
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class RadioGroupComponent<T = any> implements ControlValueAccessor {
  @Input() name = `rg_${Math.random().toString(16).slice(2)}`;
  @Input() options: AppOption<T>[] = [];
  @Input() disabled = false;

  /** layout */
  @Input() direction: 'row' | 'col' = 'col';

  /** Tailwind override */
  @Input() wrapperClass = '';
  @Input() itemClass = '';
  @Input() dotClass = '';
  @Input() labelClass = '';

  /** compare cho object value */
  @Input() compareWith: (a: T | null, b: T | null) => boolean = (a, b) => a === b;

  @Output() valueChange = new EventEmitter<T>();

  value: T | null = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange: (v: T | null) => void = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched: () => void = () => {};

  writeValue(v: T | null): void {
    this.value = v ?? null;
  }
  registerOnChange(fn: (v: T | null) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  isSelected(v: T) {
    return this.compareWith(this.value, v);
  }

  select(v: T) {
    if (this.disabled) return;
    this.value = v;
    this.onChange(v);
    this.valueChange.emit(v);
  }

  touch() {
    this.onTouched();
  }
}
