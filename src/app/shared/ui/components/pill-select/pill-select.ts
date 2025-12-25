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
import { AppKVOption } from '../../../types/option-types';

@Component({
  selector: 'app-pill-select',
  imports: [CommonModule],
  templateUrl: './pill-select.html',
  styleUrl: './pill-select.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PillSelectComponent),
      multi: true,
    },
  ],
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class PillSelectComponent<T = any> implements ControlValueAccessor {
  @Input() options: AppKVOption<T>[] = [];
  @Input() disabled = false;

  /** Tailwind overrides */
  @Input() wrapperClass = '';
  @Input() rowClass = '';
  @Input() pillClass = 'px-4 py-2 text-sm rounded-lg';
  @Input() activeClass = 'bg-emerald-600 text-white border-emerald-600';
  @Input() inactiveClass = 'bg-white text-black border-black/15 hover:border-black/30';

  /** compare (cho object) */
  @Input() compareWith: (a: T | null, b: T | null) => boolean = (a, b) => a === b;

  /** 2-way binding: [(value)] */
  private _value: T | null = null;
  @Input() set value(v: T | null) {
    this._value = v ?? null;
  }
  get value() {
    return this._value;
  }
  @Output() valueChange = new EventEmitter<T | null>();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange: (v: T | null) => void = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched: () => void = () => {};

  writeValue(v: T | null): void {
    this._value = v ?? null;
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

  isActive(opt: AppKVOption<T>) {
    return this._value !== null && this.compareWith(opt.value, this._value);
  }

  pick(opt: AppKVOption<T>) {
    if (this.disabled || opt.disabled) return;
    this._value = opt.value;
    this.onChange(this._value);
    this.valueChange.emit(this._value);
  }

  touch() {
    this.onTouched();
  }

  pillClasses(active: boolean) {
    const base =
      'inline-flex items-center justify-center border font-semibold transition ' +
      'focus:outline-none focus:ring-2 focus:ring-black/20 ' +
      'disabled:opacity-50 disabled:cursor-not-allowed';
    return [base, this.pillClass, active ? this.activeClass : this.inactiveClass]
      .filter(Boolean)
      .join(' ');
  }
}
