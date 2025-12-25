import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AppOption } from '../../../types/option-types';

@Component({
  selector: 'app-select',
  imports: [CommonModule, FormsModule],
  templateUrl: './select.html',
  styleUrl: './select.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class SelectComponent<T = any> implements ControlValueAccessor {
  @Input() options: AppOption<T>[] = [];
  @Input() placeholder = 'Chọn...';
  @Input() disabled = false;

  /** Tailwind override */
  @Input() wrapperClass = '';
  @Input() labelClass = '';
  @Input() selectClass = '';
  @Input() hintClass = '';
  @Input() errorClass = '';

  @Input() label?: string;
  @Input() hint?: string;
  @Input() error?: string;

  /** compare cho object value */
  @Input() compareWith: (a: T | null, b: T | null) => boolean = (a, b) => a === b;

  @Output() valueChange = new EventEmitter<T | null>();

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

  setValue(v: T | null) {
    this.value = v;
    this.onChange(v);
    this.valueChange.emit(v);
  }

  touch() {
    this.onTouched();
  }
}
