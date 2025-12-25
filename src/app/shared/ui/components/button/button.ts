import { CommonModule, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

 
type BtnVariant = 'solid' | 'outline' | 'ghost';

 
type BtnSize = 'sm' | 'md' | 'lg' | 'icon';

@Component({
  selector: 'app-button',
  imports: [CommonModule, NgTemplateOutlet],
  templateUrl: './button.html',
  styleUrl: './button.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  // Handler event
  @Output() clicked = new EventEmitter<MouseEvent>();

  // Custom position icons :Sp icons fontawesome
  @Input() iconClassFa?: string;
  @Input() iconTpl?: TemplateRef<unknown>;
  @Input() iconPosition: 'left' | 'right' = 'left';

  // Button properties
  @Input() btnClass = '';
  @Input() iconClass = '';

  // Behavior properties
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() ariaLabel?: string;

  // Styles
  @Input() variant: BtnVariant = 'solid';
  @Input() size: BtnSize = 'md';

  onClick(e: MouseEvent) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.clicked.emit(e);
  }

  get classes(): string {
    const base =
      'inline-flex items-center justify-center gap-2 rounded-lg font-medium ' +
      'transition active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 ' +
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';

    const variants: Record<BtnVariant, string> = {
      solid: 'bg-black text-white hover:opacity-90 focus:ring-black',
      outline: 'border border-black text-black hover:bg-black hover:text-white focus:ring-black',
      ghost: 'text-black hover:bg-black/10 focus:ring-black',
    };

    const sizes: Record<BtnSize, string> = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-5 py-3 text-base',
      icon: 'p-2',
    };

    return [base, variants[this.variant], sizes[this.size], this.btnClass]
      .filter(Boolean)
      .join(' ');
  }
}
