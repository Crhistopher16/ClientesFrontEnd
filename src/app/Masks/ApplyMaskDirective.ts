import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appApplyMask]'
})
export class ApplyMaskDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input') onInput() {
    this.applyMask(this.el.nativeElement);
  }

  private applyMask(input: HTMLInputElement) {
    let unmasked = input.value.replace(/\./g, ' ').replace(/ /g, '').replace(/[^0-9.,]/g, '');
    if (unmasked.length > 11) {
      unmasked = unmasked.slice(0, 11);
    }
    input.value = this.addDots(unmasked);
  }

  private addDots(value: string): string {
    let x = value.split(',');
    let x1 = x[0]; // parte entera
    let x2 = x.length > 1 ? ',' + x[1] : ''; // parte decimal
    const rgx = /(\d+)(\d{3})/;

    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }

    return x1 + x2;
  }
}
