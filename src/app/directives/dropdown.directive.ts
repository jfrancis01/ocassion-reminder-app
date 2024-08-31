import { Directive, HostListener, Renderer2, ElementRef } from '@angular/core';
 
@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  isOpen = false;
  dropdownMenu: HTMLElement | null = null;
 
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
 
  // We use this lifeCycle hook to set the dropdownMenu property to the correct value after the view has been initialized
  ngAfterViewInit() {
    this.dropdownMenu = this.elRef.nativeElement.nextElementSibling;
  }
 
  @HostListener('click') toggleDropdown() {
 
    if (!this.dropdownMenu) {
      return;
    }
 
    if (this.isOpen) {
      this.renderer.removeClass(this.dropdownMenu, 'show');
    } else {
      this.renderer.addClass(this.dropdownMenu, 'show');
    }
 
    this.isOpen = !this.isOpen;
  }
 
  @HostListener('document:click', ['$event.target']) onClickPage(
    targetElement: HTMLElement
  ) {
    // Make sure the button is the element that was clicked
    const isButtonClicked = this.elRef.nativeElement.contains(targetElement);
    if (isButtonClicked) {
      // Click occurred inside the dropdown or dropdown menu is not initialized, do nothing
      return;
    }
 
    if (this.isOpen) {
      this.renderer.removeClass(this.dropdownMenu, 'show');
    }
 
    this.isOpen = false;
  }
}