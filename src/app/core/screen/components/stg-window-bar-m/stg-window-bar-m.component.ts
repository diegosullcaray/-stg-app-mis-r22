import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, HostListener, OnInit, OnChanges, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { StgWindowBarMConfig } from 'app/core/screen/base/stg-window-bar-m.config';

export interface DropdownItem {
  val: string;
  label: string;
}

@Component({
  selector: 'stg-window-bar-m',
  templateUrl: './stg-window-bar-m.component.html',
  styleUrls: ['./stg-window-bar-m.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StgWindowBarMComponent),
      multi: true
    }
  ]
})
export class StgWindowBarMComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input() items: DropdownItem[] = [];
  @Input() placeholder: string = 'Seleccionar';
  @Input() icon: string = 'date_range';
  @Input() disabled: boolean = false;
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() dropdownChipText: string = '';
  @Input() showTitle: boolean = true;
  @Input() config: StgWindowBarMConfig | null = null;
  
  @Output() selectionChange = new EventEmitter<DropdownItem>();
  
  @ViewChild('dropdownContainer', { static: false }) dropdownContainer!: ElementRef;
  
  isDropdownOpen: boolean = false;
  selectedItem: DropdownItem | null = null;
  
  // ControlValueAccessor properties
  private onChange = (value: any) => {};
  private onTouched = () => {};
  
  ngOnInit(): void {
    // Seleccionar el primer item por defecto si hay items disponibles
    if (this.items && this.items.length > 0 && !this.selectedItem) {
      this.selectedItem = this.items[0];
      this.onChange(this.selectedItem);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.items || !this.items || !this.items.length) {
      return;
    }

    const matchingItem = this.selectedItem && this.items.find(item => item.val === this.selectedItem.val);
    this.selectedItem = matchingItem || this.selectedItem || this.items[0];
    this.onChange(this.selectedItem);
  }

  get headerStyle(): any { return this.config && this.config.header; }
  get titleStyle(): any { return this.config && this.config.title; }
  get subtitleStyle(): any { return this.config && this.config.subtitle; }
  get dropdownChipStyle(): any { return this.config && this.config.chip; }
  get selectContainerStyle(): any { return this.config && this.config.select && this.config.select.container; }
  get selectTriggerStyle(): any { return this.config && this.config.select && this.config.select.trigger; }
  get selectDropdownStyle(): any { return this.config && this.config.select && this.config.select.dropdown; }
  get selectOptionStyle(): any { return this.config && this.config.select && this.config.select.option; }
  get selectedOptionStyle(): any { return this.config && this.config.select && this.config.select.selectedOption; }
  get responsiveClass(): string { return this.config && this.config.responsive ? 'stg-window-bar-m-' + this.config.responsive : ''; }
  get showTriggerIcon(): boolean { return !this.config || !this.config.icons || this.config.icons.trigger !== false; }
  get showOptionIcons(): boolean { return !this.config || !this.config.icons || this.config.icons.options !== false; }
  
  // ControlValueAccessor implementation
  writeValue(value: any): void {
    if (value) {
      this.selectedItem = value;
    }
  }
  
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  
  toggleDropdown(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    
    if (this.disabled) return;
    
    this.isDropdownOpen = !this.isDropdownOpen;
    this.onTouched();
  }
  
  selectItem(item: DropdownItem, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    
    if (this.disabled) return;
    
    this.selectedItem = item;
    this.isDropdownOpen = false;
    
    // Emitir el cambio para ControlValueAccessor
    this.onChange(item);
    
    // Emitir el evento personalizado
    const mockEvent = {
      source: {
        value: item,
        selected: true
      },
      isUserInput: true
    };
    
    this.selectionChange.emit(item);
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isDropdownOpen && this.dropdownContainer) {
      const targetElement = event.target as HTMLElement;
      const dropdownElement = this.dropdownContainer.nativeElement;
      
      if (!dropdownElement.contains(targetElement)) {
        this.isDropdownOpen = false;
      }
    }
  }
}
