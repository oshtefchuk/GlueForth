import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[bluenorthElementWidth]'
})
export class ElementWidthDirective {

  @Output('actual-width')
  public reportedWidth: EventEmitter<number> = new EventEmitter();

  public constructor(
    private _element: ElementRef
  ) {}

  public ngAfterViewInit(): void {
    setTimeout(() => this._reportWidth(), 0);
  }

  @HostListener('window:resize', [])
  public onWindowResize(): void {
    this._reportWidth();
  }

  private _reportWidth(): void {
    this.reportedWidth.emit(this._element.nativeElement.offsetWidth);
  }
}
