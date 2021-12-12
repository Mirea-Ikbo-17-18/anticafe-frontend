import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Option } from '../../Interfaces/option';

@Component({
  selector: 'app-option-selector',
  templateUrl: './option-selector.component.html',
  styleUrls: ['./option-selector.component.scss'],
})
export class OptionSelectorComponent implements OnInit {
  @Input() options: Option[] = [];
  @Input() selectedOptions: Option[] = [];
  @Output() selected: EventEmitter<void> = new EventEmitter<void>();

  public dropdownVisible: boolean = false;
  public title: string = '';
  constructor() {}

  ngOnInit(): void {
    console.log(this.options);
  }

  private getIndex(option: Option): number {
    for (let index = 0; index < this.selectedOptions.length; index++) {
      if (option.id === this.selectedOptions[index].id) return index;
    }
    return -1;
  }

  public isSelected(option: Option): boolean {
    return this.getIndex(option) != -1;
  }

  public toggleOption(option: Option): void {
    const index = this.getIndex(option);
    if (index > -1) {
      this.selectedOptions.splice(index, 1);
    } else {
      this.selectedOptions.push(option);
    }
    this.selected.next();
    if (this.selectedOptions.length > 0) {
      this.title = this.selectedOptions.map((option) => option.name).join(', ');
    }
  }

  public toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }
}
