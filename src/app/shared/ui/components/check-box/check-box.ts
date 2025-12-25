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

@Component({
  selector: 'app-check-box',
  imports: [CommonModule],
  templateUrl: './check-box.html',
  styleUrl: './check-box.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckBoxComponent),
      multi: true,
    },
  ],
})
export class CheckBoxComponent implements ControlValueAccessor {
  @Input() disabled = false;
  @Input() label?: string;
  @Input() description?: string;

  /** FontAwesome icon cho tick */
  @Input() checkIconClassFa = 'fa-solid fa-check';

  /** Tailwind override */
  @Input() wrapperClass = '';
  @Input() boxClass = '';
  @Input() labelClass = '';
  @Input() descClass = '';

  @Output() valueChange = new EventEmitter<boolean>();

  checked = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange: (v: boolean) => void = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched: () => void = () => {};

  writeValue(v: boolean): void {
    this.checked = !!v;
  }
  registerOnChange(fn: (v: boolean) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggle(v: boolean) {
    if (this.disabled) return;
    this.checked = v;
    this.onChange(v);
    this.valueChange.emit(v);
  }

  touch() {
    this.onTouched();
  }
}
