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

 
type ValueType = 'string' | 'number';

@Component({
  selector: 'app-text-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './text-input.html',
  styleUrl: './text-input.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() placeholder = 'Nhập...';
  @Input() disabled = false;

  @Input() valueType: ValueType = 'number';
  @Input() min?: number;
  @Input() max?: number;
  @Input() step?: number;

  @Input() suffix?: string;

  /** Tailwind overrides */
  @Input() wrapClass = '';
  @Input() inputClass = 'px-3 py-2 text-sm rounded-lg';
  @Input() suffixClass = 'text-sm text-black/60';

  private _value: string | number | null = null;
  @Input() set value(v: string | number | null) {
    this._value = v ?? null;
    this.text = this._value === null ? '' : String(this._value);
  }
  get value() {
    return this._value;
  }
  @Output() valueChange = new EventEmitter<string | number | null>();

  text = '';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function
  private onChange: (v: any) => void = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched: () => void = () => {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  writeValue(v: any): void {
    this._value = v ?? null;
    this.text = this._value === null ? '' : String(this._value);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(val: string) {
    this.text = val;

    if (!val.trim()) {
      this._value = null;
      this.onChange(null);
      this.valueChange.emit(null);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let next: any = val;
    if (this.valueType === 'number') {
      const n = Number(val);
      if (Number.isNaN(n)) return; // giữ nguyên, không emit bừa
      next = n;
    }

    this._value = next;
    this.onChange(next);
    this.valueChange.emit(next);
  }

  touch() {
    this.onTouched();
  }
}
